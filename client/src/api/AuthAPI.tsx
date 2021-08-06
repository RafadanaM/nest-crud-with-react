import axiosInstance from "../axios/axios";

export async function loginUser(
  username: string,
  password: string
): Promise<any> {
  const loginObj: any = {
    username,
    password,
  };
  const response = await axiosInstance.post("login", loginObj);
  return response.data;
}

export async function logoutUser(): Promise<any> {
  const response = await axiosInstance.post("logout");
  return response.data;
}

export async function registerUser(
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string
): Promise<any> {
  const registerObj: any = {
    username,
    password,
    email,
    firstname,
    lastname,
  };
  const response = await axiosInstance.post("register", registerObj);
  return response.data;
}
