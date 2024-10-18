<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";

  export let data;
</script>

<svelte:head>
  <title>E-commerce</title>
</svelte:head>

<section class="grid grid-cols-1 gap-4 px-2 justify-center lg:grid-cols-4">
  {#if data.products.length}
    {#each data.products as product}
      <ProductCard {product} />
    {/each}
  {:else}
    <span>No hay productos</span>
  {/if}
</section>
