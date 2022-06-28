<template>
  <div class="wrap-contact">
    <div class="video-trailer">
      <video loop autoplay muted>
        <source src="@/assets/video/cooking.mp4" type="video/mp4" />
      </video>
      <div class="video-title name-title">We'd Love to Hear From You</div>
    </div>
    <base-fragment>
      <!-- <div
        v-show="d.active"
        class="progress-contact"
        v-for="(d, i) in progress"
        :key="i"
      >
        <button @click="activeLoad(i)">{{ d.name }}</button>
        <input type="text" v-model="d.data" />
      </div>
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="cal"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="`width: ${cal}%`"
        ></div>
      </div> -->
      <contact-me></contact-me>
    </base-fragment>
  </div>
</template>
<script setup>
// import AppLoading from "@/components/loading/AppLoading.vue";
import BaseFragment from "@/components/base/BaseFragment.vue";
import ContactMe from "@/components/contact/ContactMe.vue";
// import { ref, computed } from "vue";
// const progress = ref([
//   { name: "Step 1", active: true, data: "" },
//   { name: "Step 2", active: false, data: "" },
//   { name: "Step 3", active: false, data: "" },
//   { name: "Finish", active: false, data: "" },
// ]);
// const loaded = ref(0);
// const cal = computed(() => {
//   return Math.round(((loaded.value + 1) / progress.value.length) * 100);
// });
// const activeLoad = (index) => {
//   loaded.value = index;
//   progress.value[index + 1].active = true;
// };
</script>
<style scoped>
.video-trailer {
  height: 100vh;
}

.video-trailer video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-title {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 80px;
  font-family: var(--main-font-1);
  color: #fff;
  text-align: center;
  text-shadow: 0 1px #000;
}
</style>
