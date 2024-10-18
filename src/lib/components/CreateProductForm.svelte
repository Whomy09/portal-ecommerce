<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createProductSchema, type CreateProductSchema } from "../../schemas/product";
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

  export let data: SuperValidated<Infer<CreateProductSchema>>;
  let isLoading = false;

  const dispatch = createEventDispatcher();
  const form = superForm(data, {
   validators: zodClient(createProductSchema),
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
  action="?/createProduct" 
  use:enhance={handleForm} 
  enctype="multipart/form-data"
>
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