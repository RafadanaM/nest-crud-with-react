import axiosInstance from "../axios/axios";

export async function getProducts(): Promise<any> {
  const response = await axiosInstance.get("/product");
  return response.data;
}

export async function getProduct(id: string): Promise<any> {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
}

export async function getProductsByUser(): Promise<any> {
  const response = await axiosInstance.get(`product/user`);
  return response.data;
}

export async function bookmarkProduct(id: string): Promise<any> {
  const response = await axiosInstance.post(`/product/${id}/bookmark`);
  return response.data;
}

//add note and quantity later
export async function orderProduct(id: string): Promise<any> {
  const response = await axiosInstance.post(`/product/${id}/order`, {
    order: { note: `This is a note for product ${id}` },
    item: { quantity: 2 },
  });

  return response.data;
}
