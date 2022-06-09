<template>
  <div class="wrap-header">
    <div class="header-top">
      <div class="header-top-left">
        Phone:
        <p>+84 379 000 135</p>
        or Contact Email:
        <p>tungpt244@gmail.com</p>
      </div>
      <div class="header-top-right">
        Mon - Fri / 9:00-21:00, Sat - Sun / 10:00-20:00
      </div>
    </div>
    <div class="header">
      <div class="header-logo">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="40"
          height="40"
        />
      </div>
      <div class="header-right">
        <div class="header-link">
          <router-link
            to="/"
            class="header-link-item"
            active-class="header-link-active"
            >Home</router-link
          >
          <router-link
            to="/about"
            class="header-link-item"
            active-class="header-link-active"
            >About</router-link
          >
          <router-link
            :to="{ name: 'menu-category', params: { id: 'beef' } }"
            class="header-link-item"
            active-class="header-link-active"
            >Menu</router-link
          >
          <router-link
            to="/about"
            class="header-link-item"
            active-class="header-link-active"
            >Contact</router-link
          >
          <router-link
            :to="{ name: 'menu' }"
            class="header-link-item"
            active-class="header-link-active"
            >Blog</router-link
          >
        </div>
        <div class="header-user">
          <transition name="slide-fade">
            <div v-if="status" class="header-auth">
              <div class="header-user-img">
                <img :src="user.photoURL" />
              </div>
              <!-- <div class="header-user-name">{{ user.displayName }}</div> -->
            </div>
          </transition>
          <div v-if="!status" class="header-unauth">
            <router-link :to="{ name: 'login' }">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
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

.wrap-header {
  margin: 0 200px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-top {
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  color: #ccc;
  text-shadow: 0 1px 1px #000;
}

.header-top p {
  margin: 0;
  color: #fff;
  margin: 0 10px;
}

.header-top-left {
  display: flex;
}

.header {
  padding: 0 40px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.header-logo {
  min-width: 160px;
}

.header-right {
  display: flex;
  align-items: center;
}
.header-link {
  display: flex;
  justify-content: space-around;
}

.header-link-item {
  padding: 8px 12px;
  margin: 0 2px;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

.header-link-active {
  color: var(--main-color);
  font-weight: 600;
  border-radius: 20px;
}

.header-auth {
  /* min-width: 160px;
  max-width: 180px; */
  margin-left: 16px;
  display: flex;
  align-items: center;
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
