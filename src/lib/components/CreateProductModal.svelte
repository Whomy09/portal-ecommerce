<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { createEventDispatcher } from "svelte";
  import CreateProductForm from "./CreateProductForm.svelte";
  import type { Infer, SuperValidated } from "sveltekit-superforms";
  import type { CreateProductSchema, Product } from "../../schemas/product";
  
  export let isOpen: boolean;
  export let data: SuperValidated<Infer<CreateProductSchema>>;

  const dispatch = createEventDispatcher();
  
  function closeModal() {
    dispatch('close')
  }

  function handleSuccess({ detail }: { detail: Product }) {
    dispatch('addNewProduct', detail)
    dispatch('close')
  }
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={closeModal}>
  <Dialog.Content>
    <CreateProductForm {data} on:success={handleSuccess} />
  </Dialog.Content>
</Dialog.Root>