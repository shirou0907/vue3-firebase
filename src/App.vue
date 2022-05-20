<script setup>
import BaseHeader from "@/components/header/BaseHeader.vue";
import MainHeader from "@/components/header/MainHeader.vue";
import BaseFooter from "@/components/footer/BaseFooter.vue";
import { checkPosition } from "@/composable/checkScroll.js";
const { position } = checkPosition();

const scrollTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <header>
    <base-header v-if="position < 160"></base-header>
    <transition name="scroll">
      <main-header v-if="position >= 160" />
    </transition>

    <transition name="fade">
      <div v-if="position > 1000" class="button-home" @click="scrollTop()">
        <font-awesome-icon :icon="['fas', 'angles-up']" class="fa-fade" />
      </div>
    </transition>
  </header>

  <router-view></router-view>

  <footer>
    <base-footer />
  </footer>
</template>

<style lang="scss">
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Montez&family=Roboto:wght@100&family=Suranna&display=swap");

.button-home {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 12px 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 8px #000;
  cursor: pointer;
  z-index: 10;
}

.row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
