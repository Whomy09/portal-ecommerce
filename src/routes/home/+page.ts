import type { Load } from "@sveltejs/kit";
import { HttpClient } from "../../services/http";
import type { Product } from "../../types/product";

export const load: Load = async ({ fetch }) => {
  const http = HttpClient.getInstance();
  const products = await http.get<Product[]>("/product");

  return {
    products,
  };
};
