<template>
  <div class="row">
    <div class="about col col-md-3">
      <!-- <transition-group name="test">
        <div class="list" v-for="(list, index) in lists" :key="index">
          <p>{{ list }}</p>
        </div>
      </transition-group>
      <button @click="add()">Add</button>
      <button @click="lists.pop()">Add</button> -->

      <input type="text" v-model="key" name="" id="" placeholder="choose" />

      <div class="row">
        <transition-group name="flag" >
          <div class="col col-md-4" v-for="(flag, i) in list" :key="i">
            <router-link
              :to="{
                name: 'menu-country',
                params: { id: flag.name.toLowerCase() },
              }"
              ><img
                width="60"
                :src="`/src/assets/img/flag/${flag.flag}.svg`"
                alt=""
              />
              <p>{{ flag.name }}</p></router-link
            >
          </div>
        </transition-group>
      </div>
    </div>
    <div class="col col-md-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import flags from "@/composable/nationalFlag.js";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
route.params.id ? "" : router.push("/about/american");

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
  transition: all ease-in 0.5s;
}

.flag-enter-from,
.flag-leave-to {
  transform: rotateX(45deg);
}
</style>
