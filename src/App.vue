<script setup>
import { useStore } from "vuex";

const store = useStore();
store.dispatch("checkUser");
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper"></div>
  </header>

  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";
</style>
