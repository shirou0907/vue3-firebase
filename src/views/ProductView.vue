<template>
  <div>{{ meal }}</div>
  <button @click="like()">Like</button>
  <button @click="unlike()">Unlike</button>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { updateData, updateArray } from "../repository/firestore";
const meal = ref("");
const route = useRoute();
const store = useStore();

const user = computed(() => store.getters.getUser);

console.log(user);

const getMeal = async (id) => {
  // await createOrUpdate("products", { active: true }, route.params.id);
  // await updateData("products", { comments: [{comment: "ok", rating: 5, uid: "5114"}] }, route.params.id);
  //   await updateArray(
  //     "products",
  //     { comment: "ok ok", rating: 5, uid: "5112" },
  //     route.params.id
  //   );
  // await updateArray().updateLike("products", { uid: 1234 }, route.params.id);
  // await updateArray().unLike(
  //   "users",
  //   route.params.id,
  //   store.state.auth.user.uid
  // );
  const res = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  meal.value = res;
};

const like = async () => {
  if (user.value)
    await updateArray().updateLike("users", route.params.id, user.value.uid);
  return;
};
const unlike = async () => {
  if (user.value)
    await updateArray().unLike("users", route.params.id, user.value.uid);
  return;
};

// getMeal(route.params.id);
</script>
<style lang=""></style>
