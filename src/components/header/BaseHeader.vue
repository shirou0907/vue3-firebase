<template>
  <div class="wrap-header">
    <div class="header">
      <div class="header-logo">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="80"
          height="80"
        />
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
      <div class="header-user">
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
  padding: 0 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 160px;
}

.header-logo {
  min-width: 160px;
}

.header-link {
  display: flex;
  justify-content: space-around;
}

.header-link-item {
  padding: 8px 12px;
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  font-size: 24px;
}

.header-link-active {
  color: #fcda9a;
  border-radius: 20px;
}

.header-auth {
  min-width: 160px;
  max-width: 180px;
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
