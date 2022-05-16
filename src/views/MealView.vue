<template>
  <base-fragment>
    <div>{{ meal.idMeal }}</div>
    <div>{{ meal.strMeal }}</div>
    <p>{{ meal.strInstructions }}</p>
    <img :src="meal.strMealThumb" alt="" />
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
      <div class="row" v-for="(data, index) in review" :key="index">
        <div class="col col-md-6">
          {{ data.uid }}
          {{ data.message }}
          {{ data.rate }}
        </div>
      </div>
    </div>
  </base-fragment>
</template>
<script setup>
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getOneDoc,
  createOrUpdate,
  updateArray,
} from "../repository/firestore";
const meal = ref("");
const review = ref("");
const comment = ref({ message: null, rate: null, uid: null });
const route = useRoute();
const store = useStore();

const user = computed(() => store.getters.getUser);

console.log(user);

const getComment = async () => {
  const { result } = await getOneDoc("products", route.params.id);
  review.value = result.comments;
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
    getComment();
  }
};

const getMeal = async (id) => {
  await createOrUpdate("products", { active: true }, route.params.id);
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
    `${import.meta.env.VITE_APP_API_URL}/lookup.php?i=${id}`
  );
  meal.value = res.data.meals[0];
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

getMeal(route.params.id);
</script>
<style scoped>
.wrap-fragment {
  padding-top: 200px;
}
</style>
