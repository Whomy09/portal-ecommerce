import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types.js";
import { HttpClient } from "../../services/http";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { createProductSchema, type Product } from "../../schemas/product";

export const load: PageServerLoad = async () => {
  const http = HttpClient.getInstance();
  const products = await http.get<Product[]>("/product");
  const form = await superValidate(zod(createProductSchema));

  return {
    products,
    form,
  };
};

export const actions: Actions = {
  createProduct: async (event) => {
    const form = await superValidate(event, zod(createProductSchema));
    const http = HttpClient.getInstance()

    if (!form.valid) {
      console.log("Fail --> ", form.errors);
      console.log("Fail Data --> ", form.data);

      return fail(400, {
        form,
      });
    }

    try {
      const formData = new FormData()

      formData.append('name', form.data.name)
      formData.append('price', form.data.price.toString())
      formData.append('description', form.data.description)
      formData.append('file', form.data.file)

      const product = await http.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      
      return {
        form: JSON.stringify(product),
      };
    } catch (error) {
      
    }

  },
};
