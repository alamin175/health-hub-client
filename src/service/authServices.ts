import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("Refresh token API response:", response);
    return response;
  } catch (error) {
    console.error("Error during refresh token API call:", error);
    throw error;
  }
};
