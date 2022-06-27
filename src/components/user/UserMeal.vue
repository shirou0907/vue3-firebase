<template>
  <div class="wrap-like">
    <div class="like-title">You Have Liked</div>
    <hr />
    <main-loading v-if="isLoading"></main-loading>
    <div class="wrap-list">
      <router-link
        :to="{ name: 'meal', params: { id: like.id } }"
        class="list-item"
        v-for="(like, index) in listLike"
        :key="index"
      >
        <div class="item-photo">
          <img :src="like.photo" width="60" />
        </div>
        <div class="item-name">{{ like.name }}</div>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import MainLoading from "@/components/loading/MainLoading.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { getOneDoc } from "@/repository/firestore";
import axios from "axios";

//Get info User Logged in
const store = useStore();
const user = computed(() => store.getters.getUser);
//Get status Like / UnLike
const status = ref([]);
const listLike = ref([]);
const isLoading = ref(false);
const getStatus = async () => {
  isLoading.value = true;
  if (user.value) {
    const info = await getOneDoc("users", user.value.uid);
    const { likes } = info.result;
    status.value = likes;
  }
  listLike.value = [];
  for (let i in status.value) {
    if (status.value[i]) {
      console.log(i);
      const res = await getMealItem(i);
      listLike.value = [
        ...listLike.value,
        {
          id: res.meals[0].idMeal,
          name: res.meals[0].strMeal,
          photo: res.meals[0].strMealThumb,
        },
      ];
    }
  }
  isLoading.value = false;
};

const getMealItem = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/lookup.php?i=${id}`
  );
  return res.data;
};

getStatus();
</script>
<style scoped>
.wrap-like {
  min-height: 600px;
}
.like-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.wrap-list {
  padding: 20px;
}

.list-item {
  display: flex;
  justify-content: left;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 3px 8px #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;
}
.item-name {
  margin-left: 12px;
  font-size: 18px;
  font-family: var(--main-font);
  color: var(--text-color);
}

.item-photo img {
  width: 100px;
}
</style>
