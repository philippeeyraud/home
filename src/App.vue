<<<<<<< HEAD
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
<<<<<<< HEAD
import TheHeader from "./components/Header.vue";
function loggout() {}
</script>

<template>
  <div class="d-flex flex-column app-container">
    <TheHeader :isLoggdin="false" @loggout="logout" />
    <router-view class="flex-fill"></router-view>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
.app-container {
  min-height: 100vh;
=======
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
=======
<<<<<<< HEAD
<template>
  <div class="container">
    <div class="p-20">
      <h3 class="mb-10">Formulaire</h3>
      <form @submit="mySubmit">
        <input
          v-model="nameValue"
          class="mr-10"
          type="text"
          placeholder="Prénom"
        />
        <input
          v-model="emailValue"
          class="mr-10"
          type="text"
          placeholder="Email"
        />
        <input
          v-model="passwordValue"
          class="mr-10"
          type="text"
          placeholder="Password"
        />
        <button class="btn btn-primary">Sauvegarder</button>
      </form>
    </div>
    <div class="p-20">
      <h3>Liste des utilisateurs</h3>
      <ul>
        <li v-for="user in state.users">
          <p class="mr-10">{{ user.name }} - {{ user.email }} - {{user.password}}</p>
          <button
            @click="deleteUser(user._id)"
            type="button"
            class="btn btn-danger"
          >
            Supprimer
            </button>
        </li>
      </ul>
    </div>
=======
<script setup lang="ts">
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";
import Shop from "./components/Shop/Shop.vue";
import Cart from "./components/Cart/Cart.vue";
import data from "./data/product";
import { computed, onUpdated, reactive } from "vue";
import type {
  FiltersInterface,
  FilterUpdate,
  ProductCartInterface,
  ProductInterface,
} from './interfaces';

import { DEFAULT_FILTERS } from "./data/Filters";
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
  products: ProductInterface[];
  cart: ProductCartInterface[];
  filters: FiltersInterface;
}>({
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS },
});
//Crééer la fonction qui va nous permettre d ajouter un produit dans notre panier
//On fait en sorte que lorsque cette fonction est invoqué elle recoive l id
//On implemente cette fonction
//J ajoute mon produit issue de la liste des produits
//Je dissocie  le produit qui est dans mon state , je vais créer un nv produit mais il ne faut pas qu il ait la ^m reference
//On fait la déconstruction avec les 3.
//On va écouter l evenement depuis notre shop

function addProductToCart(productId: number): void {
  const product = state.products.find((product) => product.id === productId);

  //if(product && !state.cart.find(product => product.id === productId)) {
  // state.cart.push({...product, quantity: 1 })
  //}
  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
}
//On déclare la fonction qui va nous permettre de supprimer l element de notre panier
//On supprime l'element de notre cart,on va s assure que tous les elements qui sont dans le panier n'ont pas l'id de celui que je supprime

function removeProductFromCart(productId: number): void {
  const productFromCart = state.cart.find(
    (product) => product.id === productId
  );
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    } else {
      productFromCart.quantity--;
    }
  }
  function updateFilter(filterUpdate: FilterUpdate) {
    if (filterUpdate.search !== undefined) {
      state.filters.search = filterUpdate.search;
    } else if (filterUpdate.priceRange) {
      state.filters.priceRange = filterUpdate.priceRange;
    } else if (filterUpdate.category) {
      state.filters.category = filterUpdate.category;
    } else {
      state.filters = { ...DEFAULT_FILTERS };
    }
  }
}
const cartEmpty = computed(() => state.cart.length === 0);
//Objectif est d' impacter nos filtres sur la liste de produits
//Retourner le liste de produits en prenant les filtres en considération
const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    //On verifie que le titre du produit commence bien par la recherche tapée dans l input
    if (
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === "all")
    ) {
      return true;
    } else {
      return false;
    }
  });
});
</script>

<template>
  <div class="app-container" :class="{
    gridEmpty: cartEmpty,
  }">
    <TheHeader class="header" />
    <Shop @update-filter="updateFilter" :products="filteredProducts" @add-product-to-cart="addProductToCart"
      class="shop" />
    <!--Si il ny a rien ds le panier je ne l'affiche pas je vais utiliser un v-if pour voir si il y a qql chose dans cart-->
    <Cart v-if="!cartEmpty" :cart="state.cart" class="cart" @remove-product-from-cart="removeProductFromCart" />
    <TheFooter class="footer" />
>>>>>>> 23d7ca61cd8959da50e39080c1fecb7c55692864
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { reactive } from "vue";

interface User {
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  _id?: string;
}

<<<<<<< HEAD
const state = reactive<{ users: User[] }>({
  users: [],
});

const { handleSubmit, resetForm } = useForm();

const mySubmit = handleSubmit(async value => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user: User = await response.json();
    state.users.push(user);
    resetForm();
  } catch (err) {
    console.error(err);
  }
});
const { value: passwordValue } = useField("password");
const { value: emailValue } = useField("email");
const { value: nameValue } = useField("name");

async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/signup");
    const users: User | User[] = await response.json();
    if (users) {
      state.users = Array.isArray(users) ? users : [users];
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser(userId?: string) {
  try {
    if (userId) {
      await fetch(`http://localhost:3000/api/auth/signup?id=${userId}`, {
        method: "DELETE",
      });
      state.users = state.users.filter(user => user._id !== userId);
    }
  } catch (err) {
    console.error(err);
  }
=======
.gridEmpty {
  grid-template-areas: 'header ' 'shop' 'footer ';
  grid-template-columns: 100%;
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
>>>>>>> 23d7ca61cd8959da50e39080c1fecb7c55692864
>>>>>>> 7e323a39caacee20d07d9ffd53106e0ee010fd99
}

fetchUsers();
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>
>>>>>>> 2b24bd82b0082619108311ab2f2f0cd3f6d8bea9
