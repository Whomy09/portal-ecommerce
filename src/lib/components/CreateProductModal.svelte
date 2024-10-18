<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { createEventDispatcher } from "svelte";
  import CreateProductForm from "./CreateProductForm.svelte";
  import type { Infer, SuperValidated } from "sveltekit-superforms";
  import { type CreateProductSchema, type Product, type UpdateProductSchema } from "../../schemas/product";
  
  export let mode: 'create' | 'update' = 'create';
  export let isOpen: boolean;
  export let dataCreate: SuperValidated<Infer<CreateProductSchema>>;
  export let dataUpdate: SuperValidated<Infer<UpdateProductSchema>>;

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
    <CreateProductForm {dataCreate} {dataUpdate} {mode} on:success={handleSuccess}  />
  </Dialog.Content>
</Dialog.Root>