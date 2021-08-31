import axiosInstance from "../axios/axios";

export async function getChart(): Promise<any> {
  const response = await axiosInstance.get("cart");
  return response.data;
}
