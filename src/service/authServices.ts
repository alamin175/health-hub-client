import axiosInstance from "@/helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  return await axiosInstance({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
