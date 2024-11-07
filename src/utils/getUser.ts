import { authKey } from "@/constance/authKey";
import Cookies from "js-cookie";
import { decodeToken } from "./jwt";

export const getUser = () => {
  const accessToken = Cookies.get(authKey);
  if (accessToken) {
    const decodedData = decodeToken(accessToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};
