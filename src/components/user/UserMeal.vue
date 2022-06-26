<template>
  <div>Likes</div>
  {{ listLike }}
</template>
<script setup>
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
const getStatus = async () => {
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
};

const getMealItem = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/lookup.php?i=${id}`
  );
  return res.data;
};

getStatus();
</script>
<style scoped></style>
