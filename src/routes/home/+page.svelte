<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import CreateProductModal from "$lib/components/CreateProductModal.svelte";
  import type { Product } from "../../schemas/product";

  export let data;
  
  let isOpen = false;

  function toggleModal() {
    isOpen = !isOpen
  }

  function handleAddNewProduct({ detail }: { detail: Product }) {
    data.products.push(detail)
  }

  function handleDeleteProduct({ detail }: { detail: Product }) {
    data.products = data.products.filter((product) => product.id !== detail.id)
  }
</script>

<svelte:head>
  <title>E-commerce</title>
</svelte:head>

<div class="flex justify-end my-4">
  <Button on:click={toggleModal} >Create product</Button>
  <CreateProductModal 
    {isOpen} 
    data={data.form} 
    on:close={toggleModal} 
    on:addNewProduct={handleAddNewProduct} 
  />
</div>

<div class="grid grid-cols-1 gap-4 px-2 justify-center lg:grid-cols-4">
  {#if data.products.length}
    {#each data.products as product}
      <ProductCard {product} on:delete={handleDeleteProduct} />
    {/each}
  {:else}
    <span>No hay productos</span>
  {/if}
  </div>
