<template>
  <div class="wrap-menu">
    <div class="menu-header">
      <div class="header-title">Delicious Cousine</div>
      <div class="header-intro">DISCOVER THE MENU</div>
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
<script setup>
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
  background: url("@/assets/img/header-bg.jpg") center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-title {
  font-size: 60px;
  color: #fcda9a;
  font-family: "Montez", cursive;
}

.header-intro {
  font-size: 50px;
  text-transform: uppercase;
  color: #fff;
  font-family: "Suranna", serif;
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
  overflow-y: auto;
  cursor: grabbing;
}

.menu-list::-webkit-scrollbar {
  display: none;
}
</style>
