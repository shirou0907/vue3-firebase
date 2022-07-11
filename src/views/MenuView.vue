<template>
  <div class="wrap-menu">
    <div class="menu-header">
      <div class="header-title">Delicious Cuisine</div>
      <div class="header-intro">It is easy to learn how to cook learning</div>
    </div>
    <div class="menu-meal row">
      <div class="col col-md-2">
        <div class="menu-category">Category</div>
        <div class="menu-list">
          <menu-list></menu-list>
        </div>
      </div>
      <div class="col col-md-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MenuList from "../components/menu/MenuList.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
route.params.id ? "" : router.push("/menu/beef");
</script>
<style scoped>
.wrap-menu {
}

.menu-header {
  min-height: 100vh;
  text-shadow: 0 1px #000;
  color: #fff;
  background: url("/img/header-bg.jpg") center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-title {
  font-size: 80px;
  font-family: var(--main-font-1);
}

.header-intro {
  font-size: 20px;
  color: #fff;
}

.menu-category {
  letter-spacing: 2px;
  font-size: 36px;
  font-weight: bold;
  /* font-family: var(--main-font); */
  text-align: center;
  padding: 20px 0;
}
.menu-list {
  overflow-y: hidden;
  cursor: grabbing;
}

.menu-list:hover {
  overflow-y: scroll;
}
.menu-list::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.menu-list::-webkit-scrollbar-track {
  display: none;
}

/* Handle */
.menu-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
  height: 300px;
}

/* Handle on hover */
.menu-list::-webkit-scrollbar-thumb:hover {
  background: var(--vue-color-1);
}
</style>
