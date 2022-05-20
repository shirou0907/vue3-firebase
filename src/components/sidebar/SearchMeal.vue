<template>
  <div class="wrap-search">
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
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const key = ref("");
const meals = ref([]);
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
.wrap-search {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
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
</style>
