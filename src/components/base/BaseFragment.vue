<template>
  <div class="wrap-fragment">
    <slot></slot>
    <slot name="title"></slot>
  </div>
</template>
<script setup lang="ts">
// import { defineProps } from "vue";

// const img = defineProps(["img"]);
// img ? console.log(img) : console.log("no img");
// const logo = ref("");
// watchEffect(async () => {
//   logo.value = (
//     await import(/* @vite-ignore */ `public/img/${img.img}.jpg`)
//   ).default;
// });
</script>
<style>
.wrap-fragment {
  min-height: 100vh;
}
</style>
