import { authKey } from "@/constance/authKey";
import { getNewAccessToken } from "@/service/authServices";
import { ErrorResponse, ResponseData } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Request Interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    console.log("Request Headers:", config.headers);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  //@ts-expect-error only for axios
  function (response) {
    const responseObject: ResponseData = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const config = error.config;

    // Handle expired token error
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true; // Prevent infinite retry loops

      try {
        const response = await getNewAccessToken();
        console.log("respose all", response);
        const accessToken = response?.data?.data?.accessToken;

        // Update token in cookies and headers
        config.headers["Authorization"] = accessToken;
        Cookies.set(authKey, accessToken);

        // Retry the original request
        return axiosInstance(config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Optional: Logout user or redirect to login
        // logoutUser();
        return Promise.reject(refreshError);
      }
    }

    // Return error response for other errors
    const responseObject: ErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!!!",
      errorMessage: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  }
);

export { axiosInstance };
