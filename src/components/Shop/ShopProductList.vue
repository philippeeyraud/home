<script setup lang="ts">
import type { ProductInterface } from "@/interfaces";
import ShopProduct from "./ShopProduct.vue";
//Je spécifie les informations que ce composant va récupérer
//Je fais un v-for pour itirer sur chacun des produits dans mon tableu de produits
//Sur ces produits on fait un bind de l iteration en cours
//On va le spécidier dans le shop product
//Ensuite il faut configurer l evenement depuis shop product
defineProps<{
  products: ProductInterface[];
}>();
const emit = defineEmits<{
  (e: "addProductToCart", productId: number): void;
}>();
</script>

<template>
  <div class="grid p-20">
    <!--Quand on va filtrer vue va devoir retirer les élements non selectionner et pour cela il faut ajouter une clé-->
    <ShopProduct @add-product-to-cart="emit('addProductToCart', $event)" v-for="product of products" :key="product.id"
      :product="product" />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>
