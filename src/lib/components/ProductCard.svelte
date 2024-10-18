<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { Product } from "../../schemas/product";
  import Button from "./ui/button/button.svelte";
  
  export let product: Product;
</script>

<Card.Root>
  <Card.Content>
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