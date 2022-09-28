<template>
  <input
    v-on="validationListeners"
    v-model="usernameValue"
    type="text"
  />
  <p v-if="usernameError">{{ usernameError }}</p>

  <pre>
    {{ usernameValue }}
  </pre>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { computed } from "vue";
import { toFormValidator } from "@vee-validate/zod";

const validationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Le champ est trop court" })
    .max(10, { message: "Le champ est trop long" }),
});

const validationListeners = computed(() => {
  //  Validation douce si pas encore d'erreur :
  if (!usernameError.value) {
    return {
      blur: handleChange,
      change: handleChange,
    };
  } else {
    //  Validation agressive en cas d'erreur :
    return {
      blur: handleChange,
      change: handleChange,
      input: handleChange,
    };
  }
});

useForm({
  validationSchema: toFormValidator(validationSchema),
  initialValues: { username: "Test" },
});

const {
  value: usernameValue,
  errorMessage: usernameError,
  handleChange,
} = useField("username", null, { validateOnValueUpdate: false });
</script>

<style scoped lang="scss"></style>
