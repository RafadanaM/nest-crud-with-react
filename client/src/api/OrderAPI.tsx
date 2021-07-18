import axiosInstance from "../axios/axios";

export async function getOrderByUser(filter: string | null): Promise<any> {
  const response = await axiosInstance.get(`orders/user?status=${filter}`);
  return response.data;
}

export async function getOrder(id: string): Promise<any> {
  const response = await axiosInstance.get(`orders/${id}`);
  return response.data;
}

export async function changeOrderStatus(
  id: string,
  status: string
): Promise<any> {
  const response = await axiosInstance.put(`orders/${id}/${status}`);
  return response.data;
}

//add note and quantity later
export async function orderProduct(id: string): Promise<any> {
  const response = await axiosInstance.post(`/orders/product/${id}`, {
    order: { note: `This is a note for product ${id}` },
    item: { quantity: 2 },
  });

  return response.data;
}
