import axiosInstance from "../axios/axios";

export async function addToCart(
  productId: string,
  quantity: number
): Promise<any> {
  const response = await axiosInstance.post(`cart-item`, {
    productId: productId,
    quantity: quantity,
  });
  return response.data;
}

export async function deleteCartItem(cartItemId: string): Promise<any> {
  const response = await axiosInstance.delete(`cart-item/${cartItemId}`);
  return response.data;
}

export async function editCartItem(
  cartItemId: string,
  quantity: number
): Promise<any> {
  const response = await axiosInstance.put(`cart-item/${cartItemId}`, {
    quantity: quantity,
  });

  return response.data;
}
