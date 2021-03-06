import axiosInstance from "../axios/axios";
import { ProductDTO } from "../interfaces/interface";

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

export async function updateProduct(
  product: ProductDTO,
  productId: string
): Promise<any> {
  const response = await axiosInstance.put(`/product/${productId}`, {
    ...product,
  });
  return response.data;
}

export async function createProduct(product: ProductDTO): Promise<any> {
  const response = await axiosInstance.post("/product", { ...product });
  return response.data;
}
