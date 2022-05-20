<template>
  <base-fragment>
    <main-loading v-if="isLoading"></main-loading>
    <div class="menu-list row">
      <router-link
        :to="{
          name: 'menu-category',
          params: { id: item.strCategory.toLowerCase() },
        }"
        class="menu-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <p>{{ item.strCategory }}</p>
        <img :src="item.strCategoryThumb" alt="" />
      </router-link>
    </div>
  </base-fragment>
</template>
<script setup>
import MainLoading from "../loading/MainLoading.vue";
import BaseFragment from "../base/BaseFragment.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
const list = ref([]);
const isLoading = ref(false);
onMounted(() => {
  getListCategory();
});
const getListCategory = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/categories.php`
    );
    res ? (list.value = res.data.categories) : (list.value = []);
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
<style scoped>
.menu-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wrap-fragment {
  height: 100vh;
  direction: rtl;
  overflow-y: auto;
}


</style>
