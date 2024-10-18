<script lang="ts">
  import OrderCard from '$lib/components/OrderCard.svelte';

  export let data;
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
  {#if data.orders.length}
    {#each data.orders as order}
      <OrderCard {order} />
    {/each}
  {:else}
    <span>No hay ordenes</span>
  {/if}
</div>