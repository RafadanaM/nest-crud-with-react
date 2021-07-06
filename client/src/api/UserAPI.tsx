import axiosInstance from "../axios/axios";

export async function getCurrentUser(): Promise<any> {
  const response = await axiosInstance.get("userinfo");
  return response.data;
}
export async function getUserWishlist(): Promise<any> {
  const response = await axiosInstance.get("user/wishlist");
  return response.data;
}
