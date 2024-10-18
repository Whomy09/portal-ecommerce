<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createProductSchema, updateProductSchema, type CreateProductSchema, type UpdateProductSchema } from "../../schemas/product";
  import {
   type SuperValidated,
   type Infer,
   superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import Textarea from "./ui/textarea/textarea.svelte";
  import { enhance } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";
  import { createEventDispatcher } from "svelte";
  
  type FormAction = {
    formData: FormData;
    formElement: HTMLFormElement;
    action: URL;
    result: ActionResult;
    update(options?: {
        reset?: boolean;
        invalidateAll?: boolean;
    }): Promise<void>;
  }

  export let mode: 'create' | 'update' = 'create';
  export let dataCreate: SuperValidated<Infer<CreateProductSchema>>;
  export let dataUpdate: SuperValidated<Infer<UpdateProductSchema>>;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  const form = superForm(mode === 'create' ? dataCreate : dataUpdate, {
   validators: zodClient(mode === 'create' ? createProductSchema : updateProductSchema),
  });
  
  const { form: formData } = form;

  function onChangePrice(e: Event) {
    const target = e.target as HTMLInputElement;
    $formData.price = parseFloat(target.value);
  }

  function handleForm() {
    isLoading = true;

    return async ({ update, result }: FormAction) => {
      await update()
      
      const info = result as unknown as { data: { form: string } }
      
      const product = JSON.parse(info.data.form);

      dispatch('success', product)

      isLoading = false
    }
  }
 </script>
  
<form 
  method="post" 
  action={mode === 'create' ? "?/createProduct" : "?/updateProduct"} 
  use:enhance={handleForm} 
  enctype="multipart/form-data"
>
  {#if mode === 'update'}
    <Form.Field {form} name="id" class="hidden">
      <Form.Control let:attrs>
        <Form.Label>Name</Form.Label>
        <Input {...attrs} bind:value={$formData.id} disabled={isLoading} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  {/if}
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} disabled={isLoading} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  
  
  <Form.Field {form} name="price">
    <Form.Control let:attrs>
      <Form.Label>Price</Form.Label>
      <Input 
        {...attrs} 
        bind:value={$formData.price}
        type="number"
        disabled={isLoading}
        on:change={onChangePrice} 
      />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="description">
    <Form.Control let:attrs>
      <Form.Label>Description</Form.Label>
      <Textarea {...attrs} bind:value={$formData.description} disabled={isLoading} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field {form} name="file">
    <Form.Control let:attrs>
      <Form.Label>Image</Form.Label>
      <Input {...attrs} bind:value={$formData.file} type="file" disabled={isLoading} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button class="mt-4" disabled={isLoading}>
    {#if isLoading}
      Creating...
    {:else}
      Submit
    {/if}
  </Form.Button>
</form>