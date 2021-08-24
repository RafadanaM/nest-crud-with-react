import axiosInstance from "../axios/axios";

export async function addToCart(productId: string): Promise<any> {
  const response = await axiosInstance.post(`cart/product/${productId}/add`, {
    quantity: 2,
  });
  return response.data;
}

export async function getChart(): Promise<any> {
  const response = await axiosInstance.get("cart");
  return response.data;
}
