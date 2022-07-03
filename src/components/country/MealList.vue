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
      <transition-group appear name="list">
        <div
          class="list-item col col-md-3"
          v-for="(item, index) in fil"
          :key="index"
        >
          <router-link
            :to="{
              name: 'meal',
              params: { id: item.idMeal },
            }"
            class="menu-item"
          >
            <div class="wrap-image">
              <img v-lazy="item.strMealThumb" />
            </div>
            <div class="item-title">
              <p>{{ item.strMeal }}</p>
            </div>
          </router-link>
          <div class="like-test">
            <!-- <div class="placement">
              <div
                @click="
                  isLike ? unlike(item.idMeal) : like(item.idMeal),
                    (isLike = !isLike)
                "
                class="heart"
                :class="[listLike.includes(item.idMeal) ? 'is-active' : '']"
              ></div>
            </div> -->
            <transition name="like">
              <div
                class="like-icon like-icon-active"
                v-if="listLike.includes(item.idMeal)"
                @click="unlike(item.idMeal)"
              >
                <font-awesome-icon :icon="['fas', 'heart']" />
              </div>
              <div class="like-icon" v-else @click="like(item.idMeal)">
                <font-awesome-icon :icon="['fas', 'heart']" />
              </div>
            </transition>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import MainLoading from "@/components/loading/MainLoading.vue";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { getOneDoc, updateArray } from "@/repository/firestore";
const id = ref("american");
const route = useRoute();
watch(route, (newRoute) => {
  id.value = newRoute.params.id;
  getList();
});

const list = ref([]);
// const isLike = ref("false");
// const imgLoaded = ref("false");
    // @load="imgLoaded = true"
    // :class="[imgLoaded ? 'loading-image' : '']"
    // v-show="imgLoaded"
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
      `${import.meta.env.VITE_APP_API_URL}/filter.php?a=${id.value}`
    );
    res ? (list.value = res.data.meals) : (list.value = []);
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
};
getList();

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
      listLike.value = [...listLike.value, i];
    }
  }
};
getStatus();

//Send Like / UnLike
const like = async (id) => {
  if (user.value) {
    await updateArray().like("users", id, user.value.uid);
  }
  await getStatus();
};
const unlike = async (id) => {
  if (user.value) {
    await updateArray().unLike("users", id, user.value.uid);
  }
  await getStatus();
};
</script>
<style scoped>
.heart {
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
}
.is-active {
  transition-duration: 1s;
  background-position: -2800px 0;
}

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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
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

.list-item {
  margin-top: 18px;
}

.menu-item {
  text-decoration: none;
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
  transform-origin: 80% 40% 0;
  transition: filter 0.3s, transform 0.3s ease-in-out;
}

.wrap-image:hover img {
  transform: scale(1.1);
  filter: brightness(0.8);
}

.wrap-image:hover + .item-title p {
  color: #000;
  font-weight: 600;
}

.list-item:hover .like-icon {
  opacity: 1;
}

.loading-image {
  height: 160px;
  background: transparent url("/img/loading-image.gif") center / cover no-repeat;
}
.like-test {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10;
}

.like-icon {
  transition: all ease-in 0.3s;
  font-size: 24px;
  opacity: 0;
  color: #fff;
  cursor: pointer;
}

.like-icon-active {
  color: red;
}

.like-enter-from {
  opacity: 0;
  transform: scale(0.1);
}

.like-enter-to {
  opacity: 1;
}

.like-leave-to {
  opacity: 0;
  transform: scale(0.1);
}
.like-move,
.like-enter-active,
.like-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.like-leave-active {
  position: absolute;
}
</style>
