<template>
  <base-fragment class="wolrd-cousine">
    <div class="world-wrap">
      <div class="world-title">World Cuisine</div>
      <div class="world-description">
        Which country's cuisine do you want to explore?
      </div>
    </div>
  </base-fragment>
  <base-fragment>
    <div v-if="!isOpen" class="world-popup" @click="isOpen = true">
      <font-awesome-icon
        :icon="['fas', 'angle-right']"
        class="world-popup-icon"
      />
    </div>
    <div class="row">
      <transition name="open">
        <div
          v-if="isOpen"
          class="country-list"
          :class="[isOpen ? 'col col-md-3' : '']"
        >
          <input
            class="country-list-input"
            type="text"
            v-model="key"
            name=""
            id=""
            placeholder="National..."
          />
          <font-awesome-icon
            @click="isOpen = false"
            :icon="['fas', 'xmark']"
            class="world-popup-hide"
          />
          <div class="row">
            <transition-group name="flag">
              <div class="col col-md-4" v-for="(flag, i) in list" :key="i">
                <router-link
                  class="country-item"
                  :to="{
                    name: 'menu-country',
                    params: { id: flag.name.toLowerCase() },
                  }"
                  ><img
                    width="60"
                    :src="`/src/assets/img/flag/${flag.flag}.svg`"
                    alt=""
                  />
                  <p>{{ flag.name }}</p>
                </router-link>
              </div>
            </transition-group>
          </div>
        </div>
      </transition>
      <div :class="[isOpen ? '' : 'pad', 'col']">
        <router-view></router-view>
      </div></div
  ></base-fragment>
</template>

<script setup>
import { checkPosition } from "@/composable/checkScroll.js";
import BaseFragment from "@/components/base/BaseFragment.vue";
import flags from "@/composable/nationalFlag.js";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const isOpen = ref(true);

const route = useRoute();
const router = useRouter();
route.params.id ? "" : router.push("/about/american");

const key = ref("");
const list = computed(() => {
  return flags.value.filter((item) => {
    return item.name.toLowerCase().includes(key.value.toLowerCase().trim());
  });
});

const { position } = checkPosition();
const handleScroll = () => {
  position.value == 800 ? (isOpen.value = true) : " ";
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.wolrd-cousine {
  background: url("@/assets/img/world.jpg") center / cover no-repeat;
  padding: 40px 120px;
}

.world-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 20px;
  color: #fff;
  text-shadow: 0 1px #000;
}

.world-title {
  font-size: 80px;
  font-family: var(--main-font-1);
}

.world-description {
  font-size: 20px;
}

.world-popup {
  position: absolute;
  top: 20px;
  left: 0;
  width: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-color);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;
  cursor: pointer;
}

.world-popup:hover {
  filter: brightness(0.9);
}

.world-popup-icon {
  font-size: 28px;
  font-weight: bold;
}

.world-popup-hide {
  position: absolute;
  right: 12px;
  top: 12px;
  font-size: 20px;
  background-color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.pad {
  padding: 0 120px;
}

.country-list {
  padding: 20px 12px;
  background-color: #fcfcfc;
}

.country-list-input {
  padding: 4px 12px;
  width: 100%;
  border: none;
  background-color: #fcfcfc;
  border-bottom: 1px solid #ccc;
  outline: none;
  margin-bottom: 20px;
}

.country-item {
  text-decoration: none;
  color: #666;
}

.country-item:hover p {
  color: #000;
  font-weight: 600;
}

.country-item p {
  font-size: 12px;
  margin: 0;
}

.country-item img {
  width: 100%;
  margin-top: 10px;
}

.flag-enter-active,
.flag-leave-active {
  transition: all ease-in 0.5s;
}

.flag-enter-from,
.flag-leave-to {
  transform: rotateX(45deg);
}

.open-enter-active,
.open-leave-active {
  transition: all ease-in 0.3s;
}

.open-enter-from,
.open-leave-to {
  opacity: 0;
  transform: matrix(0.9, 0, 0, 0.9, 0, 0);
  transform-origin: 0 0;
}

.open-enter-to,
.open-leave-from {
  opacity: 1;
}
</style>
