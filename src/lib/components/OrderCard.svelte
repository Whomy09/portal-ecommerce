<script lang="ts">
  import type { Order } from "../../schemas/order";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import Ellipsis from "lucide-svelte/icons/ellipsis";

  export let order: Order;
  
  $: orderId = `${order.id.slice(0, 11)}...`;
</script>

<div class="flex flex-col border rounded-md p-4">
  <div class="flex justify-between mb-4">
    <h3 class="font-bold"># Order: {orderId}</h3>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ellipsis />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>Menu</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="flex flex-col gap-2 mt-2">
    <h2>Productos:</h2>
    {#each order.products as product}
      <div class="flex border p-2 rounded-md justify-between">
        <span>{product.name}</span>
        <span>{product.price}</span>
      </div>
    {/each}
  </div>
  <div class="flex justify-between mt-4">
    <span class="font-semibold">Total:</span>
    <span class="font-semibold">${order.totalAmount}</span>
  </div>
</div>