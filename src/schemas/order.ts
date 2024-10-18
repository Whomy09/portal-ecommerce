import { z } from "zod";
import { productSchema } from "./product";

export enum OrderStatus {
  Completed = "COMPLETED",
  Canceled = "CANCELED",
  Pending = "PENDING",
}

export const OderStatusEnum = z.nativeEnum(OrderStatus);

export const orderSchema = z.object({
  id: z.string(),
  products: z.array(productSchema),
  totalAmount: z.number(),
  status: OderStatusEnum,
  createdAt: z.string(),
  updateAt: z.string(),
  userId: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

export const createOrderSchema = orderSchema.pick({
  products: true,
  totalAmount: true,
  userId: true
})

export type CreateOrderSchema = typeof createOrderSchema
