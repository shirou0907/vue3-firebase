<script setup>
import BaseHeader from "@/components/header/BaseHeader.vue";
import MainHeader from "@/components/header/MainHeader.vue";
import { checkPosition } from "@/composable/checkScroll.js";
const { position } = checkPosition();
</script>

<template>
  <header>
    <BaseHeader v-if="position < 160"></BaseHeader>
    <transition name="scroll">
      <MainHeader v-if="position >= 160" />
    </transition>
  </header>

  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Montez&family=Roboto:wght@100&family=Suranna&display=swap");
.scroll-enter-active {
  transition: all 0.1s ease-out;
}

.scroll-leave-active {
  transition: all 0.5s ease-out;
}

.scroll-enter-from {
  transform: translateY(-20px);
}
.scroll-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
