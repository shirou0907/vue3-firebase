<template>
  <base-fragment>
    <div>{{ meal.idMeal }}</div>
    <div>{{ meal.strMeal }}</div>
    <p>{{ meal.strInstructions }}</p>
    <img :src="meal.strMealThumb" alt="" />

    <div class="wrap-spice row">
      <div
        v-for="(spice, index) in meal.spice"
        :key="index"
        class="col col-md-3"
      >
        {{ spice.name }}
        <img
          :src="`https://www.themealdb.com/images/ingredients/${spice.name}-Small.png`"
          alt=""
        />
        {{ spice.mesure }}
      </div>
    </div>
    <button @click="like()">Like</button>
    <button @click="unlike()">Unlike</button>

    <div class="form-comment">
      comment
      <input
        type="text"
        name="comment"
        id="comment"
        v-model="comment.message"
      />
      rate
      <input type="number" v-model="comment.rate" />
      <button @click="sendComment()">Send</button>
    </div>

    <div class="meal-review">
      <p v-if="isLoading">Loading...</p>
      <div class="row" v-for="(data, index) in review" :key="index">
        <div v-if="data.name" class="col col-md-6">
          {{ data.message }}
          {{ data.rate }}
          {{ data.name }}
          <img :src="data.photo" alt="" width="32" />
        </div>
      </div>
    </div>
  </base-fragment>
</template>
<script setup>
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getOneDoc,
  createOrUpdate,
  updateArray,
} from "../repository/firestore";
// import { serverTimestamp } from "firebase/firestore";
const meal = ref("");
const review = ref([]);
const isLoading = ref(false);
const comment = ref({ message: null, rate: null, uid: null, updateAt: null });
const route = useRoute();
const store = useStore();
watch(route, (newRoute) => {
  getMeal(newRoute.params.id);
});
const user = computed(() => store.getters.getUser);
console.log(user);

const getMeal = async (id) => {
  await createOrUpdate("products", { active: true }, route.params.id);
  const res = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/lookup.php?i=${id}`
  );
  meal.value = res.data.meals[0];
  const spice = [];
  for (let i = 1; i <= 20; i++) {
    if (meal.value[`strIngredient${i}`] != "")
      spice.push({
        name: meal.value[`strIngredient${i}`],
        mesure: meal.value[`strMeasure${i}`],
      });
  }
  meal.value = { ...meal.value, spice };
};
getMeal(route.params.id);

const getComment = async () => {
  isLoading.value = true;
  const { result } = await getOneDoc("products", route.params.id);
  if (result.comments) {
    result.comments.forEach(async (data, index, arr) => {
      try {
        const info = await getOneDoc("users", data.uid);
        const { name, photo } = info.result;
        return (arr[index] = { ...data, name, photo });
      } catch (error) {
        console.log(error);
      }
    });
    setTimeout(() => {
      review.value = result.comments;
      isLoading.value = false;
    }, 1000);
  }
};
getComment();

const sendComment = async () => {
  if (comment.value != null) {
    comment.value.uid = user.value.uid;
    await updateArray().updateComment(
      "products",
      comment.value,
      route.params.id
    );
    await getComment();
  }
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
</script>
<style scoped>
.wrap-fragment {
  padding-top: 200px;
}
</style>
