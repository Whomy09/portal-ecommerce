import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types.js";
import { HttpClient } from "../../services/http";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {
  createProductSchema,
  updateProductSchema,
  type Product,
} from "../../schemas/product";

export const load: PageServerLoad = async () => {
  const http = HttpClient.getInstance();
  const products = await http.get<Product[]>("/product");
  const form = await superValidate(zod(createProductSchema));
  const formUpdateProduct = await superValidate(zod(updateProductSchema));

  return {
    products,
    form,
    formUpdateProduct,
  };
};

export const actions: Actions = {
  createProduct: async (event) => {
    const form = await superValidate(event, zod(createProductSchema));
    const http = HttpClient.getInstance();

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      const formData = new FormData();

      if (!form.data.file) return;

      formData.append("name", form.data.name);
      formData.append("price", form.data.price.toString());
      formData.append("description", form.data.description);
      formData.append("file", form.data.file);

      const product = await http.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        form: JSON.stringify(product),
      };
    } catch (error) {
      return fail(400, {
        form,
      });
    }
  },
  updateProduct: async (event) => {
    const form = await superValidate(event, zod(updateProductSchema));
    const http = HttpClient.getInstance();
    
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      const formData = new FormData();

      formData.append("name", form.data.name);
      formData.append("price", form.data.price.toString());
      formData.append("description", form.data.description);
      
      if (form.data.file) {
        formData.append("file", form.data.file);
      }

      const product = await http.patch(`/product/${form.data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      return {
        form: JSON.stringify(product)
      }
    } catch (error) {
      console.log(error)
    }
  },
};
