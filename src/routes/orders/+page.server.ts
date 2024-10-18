import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "../$types";
import { createOrderSchema, type Order } from "../../schemas/order";
import type { Product } from "../../schemas/product";
import { HttpClient } from "../../services/http";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
  const http = HttpClient.getInstance();
  const orders = await http.get<Order[]>("/order");
  const products = await http.get<Product[]>("/product");
  const formCreateOrder = await superValidate(zod(createOrderSchema));

  return {
    orders,
    products,
    formCreateOrder,
  };
};

export const actions: Actions = {
  createOrder: async (event) => {
    const http = HttpClient.getInstance();
    const form = await superValidate(event, zod(createOrderSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    console.log(form.data)
  }
};