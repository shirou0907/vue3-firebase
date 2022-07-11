<template>
  <transition name="fade-in">
    <div v-if="show" class="wrap-noti">
      <div class="alert" :class="message.type">
        {{ message.value }}
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  props: ["message", "show"],
  methods: {},
};
</script>
<style scoped>
.wrap-noti {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 300px;
  z-index: 10000;
}
.fade-in-enter-active {
  transition: all 0.3s ease-out;
}

.fade-in-leave-active {
  transition: all 0.3s ease-out;
}

.fade-in-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
