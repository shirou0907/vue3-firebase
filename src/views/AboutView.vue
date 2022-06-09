<template>
  <div class="about">
    <transition-group name="test">
      <div class="list" v-for="(list, index) in lists" :key="index">
        <p>{{ list }}</p>
      </div>
    </transition-group>
    <button @click="add()">Add</button>
    <button @click="lists.pop()">Add</button>

    <input type="text" v-model="key" name="" id="" placeholder="choose" />

    <transition-group name="flag">
      <div v-for="(flag, i) in list" :key="i">
        <img width="60" :src="`src/assets/img/flag/${flag.flag}.svg`" alt="" />
        <p>{{ flag.name }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import flags from "@/composable/nationalFlag.js";
import { ref, computed } from "vue";
const lists = ref([1, 2, 3, 4, 5]);
const add = function () {
  lists.value.push(lists.value.length + 1);
};

const key = ref("");
const list = computed(() => {
  return flags.value.filter((item) => {
    return item.name.toLowerCase().includes(key.value.toLowerCase().trim());
  });
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}

.flag-enter-active,
.flag-leave-active {
  transition: all 0.5s;
}

.flag-enter-from,
.flag-leave-to {
  transform: rotateX(45deg);
}
</style>
