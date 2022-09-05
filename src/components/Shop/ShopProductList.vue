<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/product.interface'
import ShopProduct from './ShopProduct.vue'
defineProps<{
  products: ProductInterface[]
}>()
</script>

<template>
  <div class="grid p-20">
    <ShopProduct v-for="product of products" :product="product"/>
   
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 500px;
  gap: 20px;
}
</style>
