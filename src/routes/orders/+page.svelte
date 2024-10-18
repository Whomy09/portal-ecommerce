<script lang="ts">
  import CreateAndUpdateOrderModal from '$lib/components/CreateAndUpdateOrderModal.svelte';
  import OrderCard from '$lib/components/OrderCard.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  export let data;
  let isOpen = false;

  function toggleModal() {
    isOpen = !isOpen
  }
</script>

<div class="flex justify-end">
  <Button on:click={toggleModal} >Create order</Button>
  <CreateAndUpdateOrderModal 
    {isOpen}
    dataCreate={data.formCreateOrder}
    products={data.products} 
    on:close={toggleModal} 
  />
</div>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
  {#if data.orders.length}
    {#each data.orders as order}
      <OrderCard {order} />
    {/each}
  {:else}
    <span>No hay ordenes</span>
  {/if}
</div>