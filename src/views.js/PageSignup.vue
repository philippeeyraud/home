<script setup lang="ts">
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import type { UserForm } from "@/shared/interfaces";
// validation du schema
const validationSchema = toFormValidator(
  z.object({
    name: z
      .string({ required_error: "Vous devez renseigner ce champ" })
      .min(2, "Trop court"),
    email: z
      .string({ required_error: "Vous devez renseigner ce champ" })
      .email("Format email incorrect"),
    password: z
      .string({ required_error: "Vous devez renseigner ce champ" })
      .min(8, "Le mot de passe doit faire au moins 8 caractères"),
  })
);

const { handleSubmit, setErrors } = useForm({
  validationSchema,
});

const submit = handleSubmit((formValue: UserForm) => {
  console.log(formValue);
});
//Declaration de tous les champs
const { value: nameValue, errorMessage: nameError } = useField("name");
const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passwordValue, errorMessage: passwordError } = useField("password");
</script>

<template>
  <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
    <form @submit="submit" class="card">
      <h2 class="mb-20">Inscription</h2>
      <div class="d-flex flex-column mb-20">
        <label for="name" class="mb-5">Name*</label>
        <input v-model="nameValue" id="name" type="text" />
        <p v-if="nameError" class="form-error">{{ nameError }}</p>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="email" class="mb5">Email*</label>
        <input v-model="emailValue" id="email" type="text" />
        <p v-if="emailError" class="form-error">{{ emailError }}</p>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="password" class="mb5">Password</label>
        <input v-model="passwordValue" id="password" type="password" />
        <p v-if="passwordValue" class="form-error">{{ passwordError }}</p>
      </div>
      <div>
        <button class="btn btn-primary">Inscription</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  width: 500px;
  padding: 20px;
  background-color: white;
}
</style>
