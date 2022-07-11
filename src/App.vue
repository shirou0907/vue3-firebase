<script setup lang="ts">
import BaseHeader from "@/components/header/BaseHeader.vue";
import MainHeader from "@/components/header/MainHeader.vue";
import BaseFooter from "@/components/footer/BaseFooter.vue";
import { checkPosition } from "@/composable/checkScroll";
import { useRoute } from "vue-router";
const route = useRoute();
const { position } = checkPosition();
const scrollTop = () => {
  window.scrollTo(0, 0);
};

const checkWidth = () => {
  if (window.innerWidth > 768) {
    return true;
  } else {
    return false;
  }
};

// console.log(checkWidth());
</script>

<template>
  <div class="app" v-if="checkWidth()">
    <header>
      <transition name="base">
        <base-header v-if="route.meta.isShow && position < 160"></base-header>
      </transition>
      <transition name="scroll">
        <main-header v-if="route.meta.isShow && position >= 160" />
      </transition>

      <transition name="fade">
        <div v-if="position > 1000" class="button-home" @click="scrollTop()">
          <font-awesome-icon :icon="['fas', 'angles-up']" class="fa-fade" />
        </div>
      </transition>
    </header>

    <router-view></router-view>

    <footer>
      <base-footer v-if="route.meta.isShow" />
    </footer>
  </div>
  <div id="not-support" v-else></div>
</template>

<style lang="scss">
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&family=Montez&family=Roboto:wght@100&family=Suranna&display=swap");
.app {
  min-width: 1200px;
  overflow-y: auto;
}

#not-support {
  background: url("/img/nsm.png") center / cover no-repeat;
  height: 100vh;
}

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
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px var(--vue-color-2);
  // border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--vue-color-1);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--vue-color-1);
}
</style>
