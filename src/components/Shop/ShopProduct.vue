<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/product.interface';


  defineProps<{
product: ProductInterface
  }>()
</script>

<template>
  <div class="product d-flex flex-column">
    <div class="product-image" :style="{ backgroundImage: `url(${product.image})`}">image</div>
    <div class="p-10 d-flex flex-column"></div>
    <h4>{{product.title}}</h4>
    <p>{{product.description}}</p>
    <div class="d-flex flex-row align-items-center">
      <strong class="flex-fill">Prix : {{product.price}}€</strong>
      <button>Ajouter au panier</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  background-color: #ffffff;
  border: var(--border);
  border-radius: var(--border-radius);
    &-image {
      border-top-right-radius:  var(--border-radius);
      border-top-left-radius:  var(--border-radius);
       
        height:600px;
       
        background-size: cover;
        background-position: center;
    }

}

</style>
