<script setup lang="ts">
   
import type { ProductInterface } from '@/interfaces/product.interface';
import ShopProductList from './ShopProductList.vue';
//Je dis quel type d information je vais récupérer en propprieté
//De la meme facon que sur app vue je vais définir le type.
//De la meme facon je transfert l'information à mon shop product list
//on ecoute le meme evenement que appvue
defineProps<{
    products: ProductInterface[]
}>()
const emit = defineEmits<{
(e: 'addProductToCart', productId: number): void
}>()
</script>

<template>
    <div>
        <ShopProductList @add-product-to-cart="emit('addProductToCart', $event)"  :products="products" />
    </div>

</template> 

<style lang="scss" scoped>
</style>