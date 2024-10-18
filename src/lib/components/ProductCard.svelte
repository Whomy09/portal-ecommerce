<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { Product } from "../../schemas/product";
  import Button from "./ui/button/button.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import { createEventDispatcher } from "svelte";
  import { HttpClient } from "../../services/http";
  
  export let product: Product;
  
  const http = HttpClient.getInstance();
  const dispatch = createEventDispatcher();
  
  async function handleDelete() {
    await http.delete(`/product/${product.id}`)
    dispatch('delete', product)
  }
</script>

<Card.Root>
  <Card.Content>
    <div class="flex justify-end mb-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Ellipsis />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Menu</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Edit</DropdownMenu.Item>
            <DropdownMenu.Item on:click={handleDelete}>Delete</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
    
    <img
      src={product.imageUrl}
      alt={product.name}
      class="h-[200px] w-full object-cover object-center rounded-md"
    />
    
    <div class="flex flex-col gap-2 mt-4">
      <Card.Title>{product.name}</Card.Title>
      <Card.Description>{product.description}</Card.Description>
    </div>
  </Card.Content>
  <Card.Footer>
    <div class="flex flex-col gap-4">
      <p>${product.price}</p>
      <Button>Agregar al carrito</Button>
    </div>
  </Card.Footer>
</Card.Root>