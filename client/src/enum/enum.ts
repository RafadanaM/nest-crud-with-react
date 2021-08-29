export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export enum Status {
  All = "all",
  WaitingForPayment = "Waiting For Payment",
  WaitingForSeller = "Waiting For Seller",
  WaitingForDelivery = "Waiting For Delivery",
  Delivering = "Delivering",
  Completed = "Completed",
}

export enum Mode {
  Buyer = "buyer",
  Seller = "seller",
}

export enum OrderType {
  All = "all",
  IncomingOrder = "Incoming Order",
  ConfirmOrder = "Confirm Order",
  SendOrder = "Send Order",
  DeliveringOrder = "Delivering Order",
  CompletedOrder = "Completed Order",
}

export const status: Status[] = [
  Status.All,
  Status.WaitingForPayment,
  Status.WaitingForSeller,
  Status.WaitingForDelivery,
  Status.Delivering,
  Status.Completed,
];
