<template>
  <div class="wrap-header">
    <div class="header">
      <div class="header-logo">
        <router-link to="/"
          ><img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="40"
            height="40"
          />
        </router-link>
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
          to="/about"
          class="header-link-item"
          active-class="header-link-active"
          >ABOUT</router-link
        >
        <router-link
          :to="{ name: 'menu' }"
          class="header-link-item"
          active-class="header-link-active"
          >MENU</router-link
        >
        <router-link
          to="/contact"
          class="header-link-item"
          active-class="header-link-active"
          >CONTACT</router-link
        >
        <router-link
          :to="{ name: 'blog' }"
          class="header-link-item"
          active-class="header-link-active"
          >BLOG</router-link
        >
      </div>
      <div class="header-user">
        <div v-if="status" class="header-auth">
          <div class="header-user-img">
            <img :src="user.photoURL" />
          </div>
          <div class="header-user-name">{{ user.displayName }}</div>
        </div>
        <div v-if="!status" class="header-unauth">
          <router-link class="header-link-item" :to="{ name: 'login' }"
            >Login</router-link
          >
        </div>
        <div v-if="status" class="header-user-setting">
          <div class="setting-list">
            <div class="setting-item">
              <router-link to="/user/profile">
                <font-awesome-icon :icon="['fas', 'address-card']" /> User
                Profile</router-link
              >
            </div>
            <div class="setting-item">
              <router-link to="/user/liked">
                <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                Meal Liked</router-link
              >
            </div>
            <div class="setting-item" @click="store.dispatch('logout')">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="tab">
      <search-meal @close-tab="closeSearch()" v-if="openSearch"></search-meal>
    </transition>
  </div>
</template>
<script setup lang="ts">
import SearchMeal from "@/components/sidebar/SearchMeal.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
const store = useStore();
const openSearch = ref(false);
const closeSearch = () => {
  openSearch.value = false;
};
// const status = ref(false);
const status = computed(() => store.getters.getStatus);
const user = computed(() => store.getters.getUser);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
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
  left: 16px;
  right: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 1px 10px;
  min-width: 1200px;
}

.header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 88px;
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
  padding: 0 10px;
  text-decoration: none;
  color: #000;
  height: 100%;
  display: flex;
  font-weight: bold;
  align-items: center;
  min-width: 120px;
  text-align: center;
  justify-content: center;
}

.header-link-active::before {
  content: "";
  position: absolute;
  bottom: 20px;
  left: 10px;
  right: 10px;
  height: 3px;
  background: linear-gradient(to right, var(--vue-color-1), var(--vue-color-2));
  border-radius: 20px;
}

.header-link-active {
  background: linear-gradient(to right, var(--vue-color-1), var(--vue-color-2));
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
}

.header-auth {
  max-width: 180px;
  min-width: 160px;
  display: flex;
  align-items: center;
}

.header-user:hover .header-user-setting {
  display: block;
}

.header-user {
  display: flex;
  align-items: centers;
}
.header-user-name {
  color: #000;
  font-size: 14px;
}
.header-user-img img {
  display: block;
  margin-right: 8px;
  height: 32px;
  width: 32px;
  box-shadow: 0 1px 4px #ccc;
  border-radius: 50%;
}

.header-user-setting {
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 10;
  display: none;
}

.setting-list {
  min-width: 160px;
  background-color: #ccc;
  border-radius: 4px;
  box-shadow: 0 1px 4px #ccc;
  padding: 12px 0;
}

.setting-list::before {
  content: "";
  position: absolute;
  height: 24px;
  top: -30px;
  left: 50%;
  border-left: 20px solid transparent;
  border-bottom: 20px solid #ccc;
  border-top: 20px solid transparent;
  border-right: 20px solid transparent;
}

.setting-item {
  cursor: pointer;
}

.setting-item:last-child {
  padding: 10px 12px;
}

.setting-item a {
  width: 100%;
  padding: 10px 12px;
  display: block;
  color: var(--text-color);
  text-decoration: none;
}

.setting-item svg {
  margin-right: 6px;
}

.setting-item:hover {
  background-color: #fff;
}
</style>
