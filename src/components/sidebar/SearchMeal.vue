<template>
  <div class="wrap-search">
    <div class="search-view">
      <input
        type="text"
        name="name"
        id="name"
        v-model.trim="key"
        @keyup="searchMeal(), (currentLoad = 6)"
      />
      <transition name="fade">
        <div v-if="!isLoading">
          <div v-for="(meal, index) in lists" :key="index">
            <router-link
              :to="{ name: 'meal', params: { id: meal.idMeal } }"
              @click="$emit('closeTab')"
              >{{ meal.strMeal }}</router-link
            >
          </div>
        </div>
      </transition>
      {{ message }}
      <button @click="currentLoad += 6" v-if="currentLoad < meals.length">
        Load
      </button>
    </div>
    <div class="wrap-modal" @click="$emit('closeTab')"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import type { Meal } from "@/interface";

const key = ref("");
const meals = ref<Meal[]>([]);
const currentLoad = ref(6);
const message = ref("");
const isLoading = ref(false);
const lists = computed(() => {
  return meals.value.slice(0, currentLoad.value);
});

const searchMeal = async () => {
  isLoading.value = true;
  const data = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/search.php?s=${key.value}`
  );
  data.data.meals
    ? (meals.value = data.data.meals)
    : ((message.value = "Wrong!"), (meals.value = []));
  isLoading.value = false;
};
</script>
<style>
.search-view {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  height: 100vh;
  background-color: #ccc;
  z-index: 100000;
  padding: 60px;
  overflow-y: auto;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.wrap-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
