import type { PageServerLoad } from "../$types";
import type { Order } from "../../schemas/order";
import { HttpClient } from "../../services/http";

export const load: PageServerLoad = async () => {
  const http = HttpClient.getInstance();
  const orders = await http.get<Order[]>("/order");

  return {
    orders,
  };
};