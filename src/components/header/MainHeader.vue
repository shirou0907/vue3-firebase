<template>
  <div class="wrap-header">
    <div class="header">
      <div class="header-logo">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="40"
          height="40"
        />
        <div class="header-search">
          <div class="header-link-item" @click="openSearch = !openSearch">
            <font-awesome-icon
              class="icon-link"
              :icon="['fas', 'magnifying-glass']"
            />
          </div>
        </div>
      </div>

      <div class="header-link">
        <router-link
          to="/"
          class="header-link-item"
          active-class="header-link-active"
          >HOME</router-link
        >
        <router-link
          to="/"
          class="header-link-item"
          active-class="header-link-active"
          >ABOUT</router-link
        >
        <router-link
          to="/menu"
          class="header-link-item"
          active-class="header-link-active"
          >MENU</router-link
        >
        <router-link
          to="/about"
          class="header-link-item"
          active-class="header-link-active"
          >CONTACT</router-link
        >
        <router-link
          :to="{ name: 'menu' }"
          class="header-link-item"
          active-class="header-link-active"
          >BLOG</router-link
        >
      </div>
      <div class="header-user" @click="store.dispatch('logout')">
        <transition name="slide-fade">
          <div v-if="status" class="header-auth">
            <div class="header-user-img">
              <img :src="user.photoURL" />
            </div>
            <div class="header-user-name">{{ user.displayName }}</div>
          </div>
        </transition>
        <div v-if="!status" class="header-unauth">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </div>
      </div>
    </div>
    <transition name="tab">
      <search-meal @close-tab="closeSearch()" v-if="openSearch"></search-meal>
    </transition>
  </div>
</template>
<script setup>
import SearchMeal from "@/components/sidebar/SearchMeal.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
const store = useStore();
const openSearch = ref(false);
const closeSearch = () => {
  openSearch.value = false;
};
const status = computed(() => store.getters.getStatus);
const user = computed(() => store.getters.getUser);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
}

.tab-enter-active {
  transition: all 0.8s linear;
}

.tab-leave-active {
  transition: all 0.6s ease-out;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateX(-200%);
}

.wrap-header {
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgb(0, 0, 0, 0.8);
}

.header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 68px;
}
.header-logo {
  min-width: 160px;
  display: flex;
  align-items: center;
}
.header-link {
  display: flex;
  justify-content: space-around;
}

.header-link-item {
  padding: 0 20px;
  text-decoration: none;
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-link-active {
  color: #fcda9a;
  border-bottom: 2px solid #fcda9a;
}

.header-auth {
  max-width: 180px;
  min-width: 160px;
  display: flex;
  align-items: center;
}

.header-user {
  display: flex;
  align-items: centers;
}
.header-user-name {
  color: #fff;
  font-size: 14px;
}
.header-user-img img {
  display: block;
  margin-right: 8px;
  height: 32px;
  box-shadow: 0 1px 4px #ccc;
  border-radius: 50%;
}
</style>
