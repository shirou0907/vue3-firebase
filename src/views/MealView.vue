<template>
  <base-fragment>
    <div class="row">
      <div class="meal-view col col-md-8">
        <div class="meal-name">{{ meal.strMeal }}</div>

        <div class="meal-img">
          <img :src="meal.strMealThumb" alt="" />
        </div>

        <div
          class="meal-description"
          v-for="(p, i) in meal.strInstructions"
          :key="i"
        >
          <div class="meal-description-item">{{ p }}</div>
        </div>

        <div class="meal-video">
          <iframe
            v-if="meal.strYoutube"
            :src="`https://www.youtube.com/embed/${meal.strYoutube}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
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
        <button @click="like()" v-if="!status">Like</button>
        <button @click="unlike()" v-if="status">Unlike</button>
      </div>
      <div class="meal-suggest col col-md-4">
        <div class="meal-suggest-title">Maybe you will like</div>
        <div class="meal-suggest-list">
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <router-link
              :to="{
                name: 'meal',
                params: { id: item.idMeal },
              }"
              class="menu-item"
            >
              <div class="wrap-image">
                <img
                  :src="item.strMealThumb"
                  @load="imgLoaded = true"
                  :class="[imgLoaded ? 'loading-image' : '']"
                  v-show="imgLoaded"
                />
                <div class="item-title">
                  <p>{{ item.strMeal }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

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
      <p v-if="isLoadingComment">Loading...</p>
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

//Check when id meal change
const route = useRoute();
const store = useStore();
watch(route, (newRoute) => {
  getMeal(newRoute.params.id);
});

//Get info User Logged in
const user = computed(() => store.getters.getUser);

//Get Meal By Id
const meal = ref("");
const getMeal = async (id) => {
  await createOrUpdate("products", { active: true }, route.params.id);
  const res = await axios.get(
    `${import.meta.env.VITE_APP_API_URL}/lookup.php?i=${id}`
  );
  if (res.data.meals) meal.value = res.data.meals[0];
  meal.value.strInstructions = meal.value.strInstructions.split(".");
  meal.value.strYoutube
    ? (meal.value.strYoutube = meal.value.strYoutube
        .split("/")[3]
        .substring(8, 19))
    : (meal.value.strYoutube = null);
  const spice = [];
  for (let i = 1; i <= 20; i++) {
    if (meal.value[`strIngredient${i}`])
      spice.push({
        name: meal.value[`strIngredient${i}`],
        mesure: meal.value[`strMeasure${i}`],
      });
  }
  const random = Math.floor(Math.random() * spice.length);
  i.value = spice[random].name;
  meal.value = { ...meal.value, spice };
  getList();
};
getMeal(route.params.id);

//Get list meal by random
const i = ref("lemon");
const list = ref([]);
const imgLoaded = ref("false");
const isLoading = ref(false);
const getList = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/filter.php?i=${i.value}`
    );
    res ? (list.value = res.data.meals.reverse()) : (list.value = []);
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};

//Get All Comment
const isLoadingComment = ref(false);
const review = ref([]);
const comment = ref({ message: null, rate: null, uid: null, updateAt: null });
const getComment = async () => {
  isLoadingComment.value = true;
  try {
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
        isLoadingComment.value = false;
      }, 1000);
    } else {
      review.value = [];
      isLoadingComment.value = false;
    }
  } catch (error) {
    isLoadingComment.value = false;
  }
};
getComment();

//Send Comment
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

//Get status Like / UnLike
const status = ref();
const getStatus = async () => {
  if (user.value) {
    const info = await getOneDoc("users", user.value.uid);
    const { likes } = info.result;
    console.log(likes);
    status.value = likes[route.params.id];
  }
};
getStatus();

//Send Like / UnLike
const like = async () => {
  if (user.value) {
    await updateArray().like("users", route.params.id, user.value.uid);
  }
  await getStatus();
};
const unlike = async () => {
  if (user.value) {
    await updateArray().unLike("users", route.params.id, user.value.uid);
  }
  await getStatus();
};
</script>
<style scoped>
.wrap-fragment {
  padding: 200px 160px;
  background-color: #fcfcfc;
}

.meal-name {
  font-size: 60px;
  font-family: var(--main-font);
  font-weight: 750;
}
.meal-description {
}
.meal-description-item {
  font-style: italic;
  font-family: serif;
}
.meal-img img {
  width: 400px;
  height: 260px;
}
.meal-video iframe{
  width: 100%;
  height: 460px;
}

.meal-suggest {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 2px #000;
}

.meal-suggest-list:hover {
  overflow-y: scroll;
}
.meal-suggest-list::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.meal-suggest-list::-webkit-scrollbar-track {
  display: none;
}

/* Handle */
.meal-suggest-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
  height: 300px;
}

/* Handle on hover */
.meal-suggest-list::-webkit-scrollbar-thumb:hover {
  background: var(--vue-color-1);
}

.meal-suggest-title {
  color: var(--text-color);
  font-size: 26px;
  font-weight: 900;
  font-family: "Playfair Display", serif;
  text-align: center;
  padding-bottom: 20px;
}

.meal-suggest-list {
  max-height: 160vh;
  padding: 0 20px;
  overflow-y: hidden;
  cursor: grabbing;
}

.list-item {
  margin-bottom: 18px;
}

.menu-item {
  text-decoration: none;
}

.item-title p {
  margin: 0;
  position: absolute;
  bottom: 10px;
  font-size: 20px;
  color: #fff;
  font-family: var(--main-font);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  transition: all linear 0.3s;
  text-shadow: 0 1px #000;
  opacity: 0;
}

.wrap-image {
  display: block;
  overflow: hidden;
  border-radius: 10px;
}

.wrap-image img {
  width: 100%;
  object-fit: cover;
  height: 200px;
  transform-origin: 80% 40% 0;
  transition: filter 0.3s, transform 0.3s ease-in-out;
}

.wrap-image:hover img {
  transform: scale(1.1);
  filter: brightness(0.8);
}

.wrap-image:hover .item-title p {
  opacity: 1;
}

.loading-image {
  height: 160px;
  background: transparent url("@/assets/img/loading-image.gif") center / cover
    no-repeat;
}
</style>
