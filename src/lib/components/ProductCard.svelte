<script lang="ts">
import type { Product } from "../../types/product";
import * as Card from "$lib/components/ui/card";
  import Button from "./ui/button/button.svelte";

export let product: Product;
</script>

<Card.Root>
  <Card.Content>
    <img
        src={product.imageUrl}
        alt={product.name}
        class="h-full w-full object-cover object-center"
      />
    <div class="mt-4">
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