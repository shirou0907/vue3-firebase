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
        active-class="category-item-active"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="item-img">
          <img :src="item.strCategoryThumb" alt="" />
        </div>
        <p>{{ item.strCategory }}</p>
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
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px 0;
  overflow: hidden;
}

.item-img {
  display: block;
  overflow: hidden;
}

.item-img img {
  width: 100%;
  height: 100%;
  transform-origin: center 0;
  transition: transform 0.4s, filter 0.4s ease-in;
}

.item-img:hover img {
  transform: scale(1.05);
}

.item-img:hover + p {
  color: #000 !important;
}

.category-item-active p {
  color: #000 !important;
  font-weight: 500;
}

.category-item-active {
}
.menu-item p {
  margin: 0;
  /* font-weight: bold; */
  color: #ccc;
  font-family: var(--main-font);
  letter-spacing: 4px;
  font-size: 24px;
  transition: all linear 0.2s;
}

.wrap-fragment {
  height: 100vh;
}
</style>
