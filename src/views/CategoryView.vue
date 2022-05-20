<template>
  <div>
    <main-loading v-if="isLoading"></main-loading>
    <div v-else class="menu-list row">
      <router-link
        :to="{
          name: 'meal',
          params: { id: item.idMeal },
        }"
        class="menu-item col col-md-2"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="wrap-image">
          <transition name="fade">
            <img
              :src="item.strMealThumb"
              @load="imgLoaded = true"
              :class="[imgLoaded ? 'loading-image' : '']"
              v-show="imgLoaded"
            />
          </transition>
        </div>
        <div class="item-title">
          <p>{{ item.strMeal }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import MainLoading from "@/components/loading/MainLoading.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const id = ref("beef");
const list = ref([]);
const imgLoaded = ref("false");

const isLoading = ref(false);
const getList = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/filter.php?c=${id.value}`
    );
    res ? (list.value = res.data.meals) : (list.value = []);
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};
getList();
const route = useRoute();
watch(route, (newRoute) => {
  id.value = newRoute.params.id;
  getList();
});
console.log(id);
</script>
<style scoped>
.fade-enter-active {
  transition: opacity 3s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}

.menu-item img {
  width: 100%;
  object-fit: cover;
}

.item-title p {
  margin: 0;
  height: 50px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.loading-image {
  height: 136px;
  background: transparent url("@/assets/img/loading-image.gif") center / cover
    no-repeat;
}
</style>
