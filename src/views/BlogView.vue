<template>
  <base-fragment>
    <blog-slide></blog-slide>
    <home-catering></home-catering>
    <blog-tab v-bind="data"></blog-tab>
  </base-fragment>
</template>
<script setup>
import BlogTab from "@/components/blog/BlogTab.vue";
import HomeCatering from "@/components/home/HomeCatering.vue";
import BlogSlide from "../components/blog/BlogSlide.vue";
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref } from "vue";
const data = ref({
  title: "Ac",
  id: 0,
});
</script>
<style scoped></style>
