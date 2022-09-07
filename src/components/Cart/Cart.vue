<script setup lang="ts">
import type { ProductCartInterface, } from "@/interfaces";
import CartProductList from "./CartProductList.vue";
//On va récupérer le cart avec une list de produits
//On transmet l'information à notre cartProductList

defineProps<{
cart: ProductCartInterface[]
}>()
const emit= defineEmits<{
(e: 'removeProductFromCart', productId: number):void
}>()
</script>

<template>
    <div class="p-20">
        <h2 class="mb-10">Panier</h2>
        <CartProductList :cart="cart" @remove-product-from-cart="emit( 'removeProductFromCart', $event)"/>
    </div>

</template>

<style lang="scss" scoped>
</style>
