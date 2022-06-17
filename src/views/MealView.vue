<template>
  <base-fragment>
    <app-loading v-if="isLoading"></app-loading>
    <div class="row">
      <div class="meal-view col col-md-9 col-sm-12">
        <div class="meal-name">{{ meal.strMeal }}</div>

        <div class="meal-cook row">
          <div class="meal-img col col-md-6">
            <img :src="meal.strMealThumb" alt="" />
          </div>

          <div class="wrap-spice col col-md-6 row">
            <div
              v-for="(spice, index) in meal.spice"
              :key="index"
              class="col col-md-3"
            >
              <img
                class="spice-img"
                :src="`https://www.themealdb.com/images/ingredients/${spice.name}-Small.png`"
                alt=""
              />
              <div class="spice-info">
                <div class="spice-name">
                  {{ spice.name }}
                </div>
                <div class="spice-measure">
                  {{ spice.mesure }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="meal-name">How to cook ?</div>
        <div
          class="meal-description"
          :class="[seeMore ? 'meal-description-active' : '']"
        >
          <div
            class="meal-description-item"
            v-for="(p, i) in meal.strInstructions"
            :key="i"
          >
            {{ p }}
          </div>
          <div
            v-if="!seeMore"
            class="meal-description-more"
            @click="seeMore = true"
          >
            See More
          </div>
        </div>

        <div class="meal-video" v-if="meal.strYoutube">
          <div class="meal-name">Follow the video tutorial</div>
          <iframe
            :src="`https://www.youtube.com/embed/${meal.strYoutube}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="meal-suggest col col-md-3 col-sm-12">
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

    <div class="meal-rating">
      <div class="form-rating" v-if="isLogin">
        <div class="rating-title">Leave a reply {{ comment.rate }}</div>
        <div class="rating-btn">
          <font-awesome-icon
            :class="[comment.rate >= 1 ? 'rate-icon-active' : 'rate-icon']"
            :icon="['fas', 'star']"
            @click="comment.rate = 1"
          />
          <font-awesome-icon
            :class="[comment.rate >= 2 ? 'rate-icon-active' : 'rate-icon']"
            :icon="['fas', 'star']"
            @click="comment.rate = 2"
          />
          <font-awesome-icon
            :class="[comment.rate >= 3 ? 'rate-icon-active' : 'rate-icon']"
            :icon="['fas', 'star']"
            @click="comment.rate = 3"
          />
          <font-awesome-icon
            :class="[comment.rate >= 4 ? 'rate-icon-active' : 'rate-icon']"
            :icon="['fas', 'star']"
            @click="comment.rate = 4"
          />
          <font-awesome-icon
            :class="[comment.rate >= 5 ? 'rate-icon-active' : 'rate-icon']"
            :icon="['fas', 'star']"
            @click="comment.rate = 5"
          />
        </div>
        <textarea
          type="text"
          name="comment"
          id="comment"
          placeholder="Enter your comment here ..."
          v-model="comment.message"
        />
        <!-- <input type="number" v-model.number="comment.rate" /> -->
        <div class="d-flex" style="justify-content: flex-end; margin-top: 12px">
          <div
            class="rating-send"
            :class="[checkComment ? 'rating-send--active' : '']"
            @click="sendComment()"
          >
            Send
          </div>
        </div>
      </div>
      <div class="form-rating" v-else>
        <router-link :to="{ name: 'login' }">Login to commment now</router-link>
      </div>
    </div>
    <div class="meal-review">
      <p v-if="isLoadingComment">Loading...</p>
      <div class="row review-list">
        <div
          class="col col-md-12 review-item"
          v-for="(data, index) in review"
          :key="index"
        >
          <div class="review-header">
            <div class="review-name">
              <div class="review-info">
                <img :src="data.photo" alt="" width="32" />
                {{ data.name }}
              </div>
              <div class="rating-btn">
                <font-awesome-icon
                  :class="[data.rate >= 1 ? 'rate-icon-active' : 'rate-icon']"
                  :icon="['fas', 'star']"
                />
                <font-awesome-icon
                  :class="[data.rate >= 2 ? 'rate-icon-active' : 'rate-icon']"
                  :icon="['fas', 'star']"
                />
                <font-awesome-icon
                  :class="[data.rate >= 3 ? 'rate-icon-active' : 'rate-icon']"
                  :icon="['fas', 'star']"
                />
                <font-awesome-icon
                  :class="[data.rate >= 4 ? 'rate-icon-active' : 'rate-icon']"
                  :icon="['fas', 'star']"
                />
                <font-awesome-icon
                  :class="[data.rate >= 5 ? 'rate-icon-active' : 'rate-icon']"
                  :icon="['fas', 'star']"
                />
              </div>
            </div>
            <div class="review-date">
              {{ new Date(data.updateAt).toLocaleString() }}
            </div>
          </div>
          <div class="review-footer">
            {{ data.message }}
          </div>
        </div>
      </div>
    </div>
  </base-fragment>
</template>
<script setup>
import AppLoading from "@/components/loading/AppLoading.vue";
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

const seeMore = ref(false);

//Check when id meal change
const route = useRoute();
const store = useStore();
watch(route, async (newRoute) => {
  await renderData(newRoute.params.id);
});

//Get info User Logged in
const user = computed(() => store.getters.getUser);
const isLogin = computed(() => store.getters.getStatus);

//Get Meal By Id
const isLoading = ref(false);
const meal = ref("");
const getMeal = async (id) => {
  isLoading.value = true;
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
  isLoading.value = false;
};

//Get list meal by random
const i = ref("lemon");
const list = ref([]);
const imgLoaded = ref("false");
const getList = async () => {
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
const comment = ref({ message: null, rate: 0, uid: null, updateAt: null });
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
        review.value = result.comments.reverse();
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

//Send Comment
const sendComment = async () => {
  if (comment.value.message && comment.value.rate) {
    const currenttime = +new Date();
    if (comment.value != null) {
      comment.value.uid = user.value.uid;
      comment.value.updateAt = currenttime;
      await updateArray().updateComment(
        "products",
        comment.value,
        route.params.id
      );
      await getComment();
      comment.value = { message: null, rate: 0, uid: null, updateAt: null };
    }
  } else {
    alert("Please enter your comment");
  }
};

//Check validate comment
const checkComment = computed(() => {
  if (comment.value.message && comment.value.rate) return true;
  return false;
});

//Render all data meal
const renderData = async (id) => {
  await getMeal(id);
  await getList();
  await getComment();
  // await Promise.all([getMeal(id), getList(), getComment()]);
};

renderData(route.params.id);
</script>
<style scoped>
.rate-icon {
  color: #ccc;
  cursor: pointer;
}
.rate-icon-active {
  cursor: pointer;
  color: rgb(229, 229, 7);
}
.wrap-fragment {
  padding: 200px 90px;
  background-color: #fcfcfc;
}

.meal-name {
  font-size: 60px;
  font-family: var(--main-font);
  font-weight: 750;
  margin-top: 20px;
}
.meal-description {
  max-height: 300px;
  overflow: hidden;
  border: 2px dashed #000;
  padding: 20px;
}
.meal-description-item {
  font-style: italic;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.meal-description-active {
  max-height: none;
  overflow: auto;
}

.meal-description-more {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  height: 40px;
  cursor: pointer;
}

.meal-img img {
  width: 100%;
  border-radius: 4px;
}

.spice-name {
  font-size: 14px;
}
.spice-img {
  margin-bottom: 20px;
  width: 100%;
  cursor: pointer;
}

.spice-img:hover + .spice-info {
  display: flex;
  opacity: 1;
}
.spice-info {
  font-family: serif;
  font-size: 12px;
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: 0px solid rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  width: 100px;
  height: 48px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fade linear 0.4s;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.spice-info::before {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-left: 10px solid transparent;
  border-top: 10px solid rgba(0, 0, 0, 0.8);
  border-bottom: 10px solid transparent;
  border-right: 10px solid transparent;
}
.meal-video iframe {
  width: 100%;
  height: 600px;
  padding: 20px;
}

.meal-suggest {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  /* box-shadow: 0 1px 2px #000; */
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
  font-family: var(--main-font);
  text-align: center;
  padding-bottom: 20px;
}

.meal-suggest-list {
  max-height: 120vh;
  padding: 0 20px;
  overflow-y: hidden;
  cursor: grabbing;
}

.list-item {
  margin-bottom: 24px;
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
  height: 160px;
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

.meal-feeling {
  width: 60px;
}

.meal-rating {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}

.form-rating textarea {
  width: 100%;
  border-radius: 6px;
  outline: none;
  padding: 10px 12px;
  font-style: italic;
}

.rating-title {
  font-size: 30px;
  font-weight: 600;
  font-family: var(--main-font);
}

.rating-btn {
  margin-bottom: 12px;
}

.rating-send {
  padding: 10px 20px;
  background-color: var(--vue-color-2);
  width: 80px;
  text-align: center;
  color: #fff;
  border-radius: 8px;
  cursor: not-allowed;
}

.rating-send--active {
  background-color: var(--vue-color-1);
  cursor: pointer;
}

.rating-send--active:hover {
  filter: brightness(1.2);
}

.review-list {
  
}

.review-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
}
</style>
