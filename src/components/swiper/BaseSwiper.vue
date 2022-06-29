<template>
  <swiper
    class="swiper"
    :modules="modules"
    :loop="true"
    :autoplay="{ delay: 1500, disableOnInteraction: false }"
  >
    <swiper-slide v-for="(rate, index) in swiper" :key="index">
      <div class="review-body">
        <div class="review-description">{{ rate.message }}</div>
        <div class="review-name">- {{ rate.name }}</div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { pagination, autoplay } from "Swiper";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  props: ["swiper"],
  setup() {
    return {
      modules: [pagination, autoplay],
    };
  },
};
</script>

<style scoped>
.review-body {
  cursor: grabbing;
}
.review-description {
  font-size: 14px;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.review-name {
  font-size: 20px;
  margin-top: 10px;
  font-family: "Suranna", serif;
  color: #db9f30;
}
</style>
