<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import data from './data/product';
import { reactive } from 'vue';
import type { ProductInterface } from './interfaces/product.interface';
//Je cree une constante et je la type pour dire quel type d'informations je vais stocker.
//Je fais un import de data pour récupérer mon tableau de data
//Je transferrt les informations sur les composants qui en ont besoin, ici le composant Shop va lister toute la liste de mes produits
//Je passe une liste de produit à mon composant shop
//const products = reactive<ProductInterface[]>(data)

//Pouvoir accepter des produits et pouvooir les déclarer dans notre panier
//On initialise avec un tableau vide
//const cart = reactive<ProductInterface[]>([]);
//Créer une proprieté réactive(state) pour pouvoir décrir tous les éléments dont on aura besoin
const state = reactive<{
products:ProductInterface[] ,
cart:ProductInterface[]
}>({
  products: data,
  cart: []
})
//Crééer la fonction qui va nous permettre d ajouter un produit dans notre panier
//On fait en sorte que lorsque cette fonction est invoqué elle recoive l id
//On implemente cette fonction
//J ajoute mon produit issue de la liste des produits
//Je dissocie  le produit qui est dans mon state , je vais créer un nv produit mais il ne faut pas qu il ait la ^m reference
//On fait la déconstruction avec les 3.
//On va écouter l evenement depuis notre shop
function addProductToCart(productId: number): void{
const product = state.products.find(product => product.id === productId);
if(product && !state.cart.find(product => product.id === productId)) {
  state.cart.push({...product}  )
}
}


</script>

<template>
  <div class="app-container">
    <TheHeader class="header" />
    <Shop :products="state.products" @add-product-to-cart="addProductToCart" class="shop" />
    <Cart class="cart " />
    <TheFooter class="footer " />
  </div>
</template>

<style lang="scss">
@import './assets/base.scss';
@import './assets/debug.scss';

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header header' 'shop cart' 'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
}
.header {
  grid-area: header;
}
.shop {
  grid-area: shop;
}
.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: white;
}
.footer {
  grid-area: footer;
}
</style>
