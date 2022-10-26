<script setup lang="ts">
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
}
</style>
