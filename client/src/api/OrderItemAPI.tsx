import axiosInstance from "../axios/axios";

export async function getOrderItemByUser(filter: string | null): Promise<any> {
  const response = await axiosInstance.get(
    `order-item/status?status=${filter}`
  );
  return response.data;
}

export async function changeOrderStatus(
  id: string,
  action: string
): Promise<any> {
  const response = await axiosInstance.post(
    `order-item/${id}?action=${action}`
  );
  return response.data;
}
