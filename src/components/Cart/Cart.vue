<script setup lang="ts">
import product from "@/data/product";
import type { ProductCartInterface, } from "@/interfaces";
import { computed } from "@vue/reactivity";
import CartProductList from "./CartProductList.vue";
//On va récupérer le cart avec une list de produits
//On transmet l'information à notre cartProductList
//Pour calculer totalPrice on additione la totalité des elemnts qui sont ds le cart*par les qt de ces elements
//Il faut utiliser une proprieté reactive(computed)
//Dans computed on utilise une fonction de call back ds lequel on va utiliser un reducer pour calculer le px total
//La methode reduce applique une fonction qui est un accumulateur et qui traite chaque valeur d'une liste afin de la réduire à une seule valeur
const props= defineProps<{
cart: ProductCartInterface[]
}>()
const totalPrice = computed(() => props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity
}, 0))

const emit= defineEmits<{
(e: 'removeProductFromCart', productId: number):void
}>()
</script>

<template>
    <div class="p-20 d-flex flex-column">
        <h2 class="mb-10">Panier</h2>
        <CartProductList 
        class="flex-fill"
        :cart="cart"
         @remove-product-from-cart="emit( 'removeProductFromCart', $event)"
         />
        <button class="btn btn-success">Commander({{totalPrice}}€)</button>
    </div>

</template>

<style lang="scss" scoped>
</style>
