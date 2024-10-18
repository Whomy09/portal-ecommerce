import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .refine((value) => parseFloat(value), {
      message: "The price cannot be zero",
    })
    .transform((value) => parseFloat(value)),
  description: z.string().min(1, "Description is required"),
  file: z.instanceof(File, { message: "The file is required" }),
});

export type CreateProductSchema = typeof createProductSchema;
