<template>
  <div class="wrap-list">
    <div class="menu-meal">
      <div class="menu-header">
        <div class="meal-search">
          <input
            type="text"
            placeholder="Search your meal ..."
            v-model="mealKey"
          />
          <font-awesome-icon
            class="search-icon"
            :icon="['fas', 'magnifying-glass']"
          />
        </div>

        <div class="meal-sort">
          <div>Sort by:</div>
          <div class="sort-icon" @click="sort(), (sortStatus = !sortStatus)">
            <font-awesome-icon
              v-if="sortStatus"
              :icon="['fas', 'arrow-down-a-z']"
            />
            <font-awesome-icon v-else :icon="['fas', 'arrow-up-z-a']" />
          </div>
        </div>
      </div>
    </div>
    <main-loading v-if="isLoading"></main-loading>
    <div v-else class="menu-list row">
      <router-link
        :to="{
          name: 'meal',
          params: { id: item.idMeal },
        }"
        class="menu-item col col-md-3"
        v-for="(item, index) in fil"
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
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const id = ref("beef");
const list = ref([]);
const imgLoaded = ref("false");
const isLoading = ref(false);
const mealKey = ref("");
const fil = computed(() => {
  return list.value.filter((item) => {
    return item.strMeal
      .toLowerCase()
      .includes(mealKey.value.toLowerCase().trim());
  });
});
const sortStatus = ref(true);
const sort = () => {
  list.value.reverse();
};
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
</script>
<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translateX(20px);
}
.fade-leave-to {
  opacity: 0;
}

.wrap-list {
  min-height: 100vh;
  padding: 20px;
}

.menu-header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.meal-search {
  flex: 1;
}

.meal-search input {
  width: 50%;
  font-size: 14px;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 12px 42px;
  border: 1px solid #ccc;
  outline: none;
}

.search-icon {
  font-size: 20px;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.meal-sort {
  display: flex;
  justify-content: space-around;
}

.sort-icon {
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
}

.menu-item {
  text-decoration: none;
  margin-top: 16px;
}

.item-title p {
  margin: 0;
  height: 30px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wrap-image {
  display: block;
  overflow: hidden;
  border-radius: 10px;
}

.wrap-image img {
  width: 100%;
  object-fit: cover;
  height: 160px;
  transform-origin: center 0;
  transition: filter 0.2s, transform 0.2s ease-in;
}

.wrap-image:hover img {
  transform: scale(1.1);
}

.loading-image {
  height: 160px;
  background: transparent url("@/assets/img/loading-image.gif") center / cover
    no-repeat;
}
</style>
