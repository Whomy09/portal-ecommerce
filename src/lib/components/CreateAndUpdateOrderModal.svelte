<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { createEventDispatcher } from "svelte";
  import type { Product } from "../../schemas/product";
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { createOrderSchema, type CreateOrderSchema } from "../../schemas/order";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form";
  import * as Select from "$lib/components/ui/select/index.js";
  import Button from "./ui/button/button.svelte";

  export let isOpen: boolean;
  export let products: Product[];
  export let dataCreate: SuperValidated<Infer<CreateOrderSchema>>;

  let isLoading = false;
  let selectedProduct = {
    value: '',
    label: ''
  }

  $: productsSelector = products.map((product) => ({
    value: product.id,
    label: product.name
  }));

  const dispatch = createEventDispatcher();
  const form = superForm(dataCreate, {
    validators: zodClient(createOrderSchema),
  })
  const { form: formData, enhance } = form;

  function closeModal() {
    selectedProduct = {
      value: '',
      label: ''
    }
    $formData.products = []
    dispatch('close');
  }

  function addProduct() {
    if (!selectedProduct.value) return;
    
    const product = products.find(({ id }) => id === selectedProduct.value);
    
    if (!product) return;
    
    $formData.products = [...$formData.products, product];
    selectedProduct = {
      value: '',
      label: ''
    }
    $formData.totalAmount = $formData.products.reduce((acc, value) =>  acc + parseFloat(value.price.toString()), 0)
  }
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={closeModal}>
  <Dialog.Content>
    <h2 class="font-bold text-lg">Create order</h2>

    <form
      method="post"
      action="?/createOrder"
      use:enhance
    >
      <div class="w-full flex items-end gap-4">
        <Form.Field {form} name="products" class="w-full">
          <Form.Control let:attrs>
            <Form.Label>Products</Form.Label>
            <Select.Root
              selected={selectedProduct}
              onSelectedChange={(v) => {
                if (v) {
                  selectedProduct = {
                    label: v.label || '',
                    value: v.value
                  }
                }
              }}
            >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select a verified email to display" />
            </Select.Trigger>
            <Select.Content>
              {#each productsSelector as select}
                <Select.Item value={select.value} label={select.label} />
              {/each}
            </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.products} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <Button class="mb-2" on:click={addProduct}>+ Add product</Button>
      </div>
      
      <Form.Button disabled={isLoading}>
        {#if isLoading}
          Creating...
        {:else}
          Submit
        {/if}
      </Form.Button>
    </form>
    
    {#if $formData.products.length}
      {#each $formData.products as product}
        <div class="flex justify-between">
          <span>- {product.name}</span>
          <span>{product.price}</span>
        </div>
      {/each}
      <div class="flex justify-between">
        <span>Total</span>
        <span>{$formData.products.reduce((acc, value) =>  acc + parseFloat(value.price.toString()), 0)}</span>
      </div>
    {:else}
      <span>Sin productos escogidos</span>
    {/if}
  </Dialog.Content>
</Dialog.Root>
