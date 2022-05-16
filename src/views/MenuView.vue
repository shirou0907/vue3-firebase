<template>
  <div class="wrap-menu">
    <div class="menu-header">
      <div class="header-title">Delicious Cousine</div>
      <div class="header-intro">DISCOVER THE MENU</div>
    </div>
    <div class="menu-meal row">
      <menu-list class="col col-md-2"></menu-list>
      <router-view class="col col-md-10"></router-view>
    </div>
  </div>
</template>
<script setup>
import MenuList from "../components/menu/MenuList.vue";
import { ref } from "vue";
</script>
<style scoped>
.wrap-menu {
}

.menu-header {
  min-height: 100vh;
  background: url("@/assets/img/menu.jpg") center / cover no-repeat;
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
</style>
