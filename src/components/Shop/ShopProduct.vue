<script setup lang="ts">
import type { ProductInterface } from '@/interfaces';

//Je spécifie les informations qui vont être récupérées par le composant
//Ici c'est un produit unique de type productInterface  
//Ensuite je met en place le binding pour pouvoir afficher les informations
//Quand l'utilisateur va clicker sur ajouter, dans shop product on catch le click,ensuite on va emettre l evenement et on va lui passer en parametrele product id
//ensuite l evenement va etre intercepté par le parent shop product list qui va lui meme emettre l evenement qui etre intercepté par le shopvue,
//Le shop va reemetre l evenement qui sera intercepté par le appvue et la si tout est bon le produit sera ajouté.
defineProps<{
product: ProductInterface
  }>()
  const emit = defineEmits<{
(e: 'addProductToCart', productId: number): void
}>()
</script>

<template>
  <div class="product d-flex flex-column">
    <div class="product-image" :style="{ backgroundImage: `url(${product.image})`}"></div>
    <div class="p-10 d-flex flex-column"></div>
    <h4>{{product.title}}</h4>
    <p>{{product.description}}</p>
    <div class="d-flex flex-row align-items-center">
      <strong class="flex-fill">Prix : {{product.price}}€</strong>
      <button class="btn btn-primary" @click="emit('addProductToCart', product.id)">
        Ajouter au panier</button>
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
