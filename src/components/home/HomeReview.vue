<template>
  <BaseFragment>
    <div class="wrap-review">
      <div class="review">
        <div class="review-title">WHAT OUR CUSTOMERS SAY</div>
        <BaseSwiper :swiper="rating"></BaseSwiper>
      </div>
    </div>
  </BaseFragment>
</template>
<script setup lang="ts">
import BaseFragment from "@/components/base/BaseFragment.vue";
import BaseSwiper from "@/components/swiper/BaseSwiper.vue";
import { ref } from "vue";

const rating = ref([
  {
    name: "Tung Pham Thanh",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt numquam, obcaecati mollitia suscipit eligendi. Officia in hic aspernatur corporis, dolores animi eveniet commodi labore vero explicabo molestiae fugit deserunt.",
  },
  {
    name: "Anh Tuan",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt numquam, obcaecati mollitia suscipit eligendi. Officia in hic aspernatur corporis, dolores animi eveniet commodi labore vero explicabo molestiae fugit deserunt.",
  },
  {
    name: "Truong Son",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt numquam, obcaecati mollitia suscipit eligendi. Officia in hic aspernatur corporis, dolores animi eveniet commodi labore vero explicabo molestiae fugit deserunt.",
  },
  {
    name: "Manh Dung",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt numquam, obcaecati mollitia suscipit eligendi. Officia in hic aspernatur corporis, dolores animi eveniet commodi labore vero explicabo molestiae fugit deserunt.",
  },
]);
</script>
<style scoped>
.wrap-fragment {
  height: 100vh;
  background: url("/img/home-review.jpg") center / cover no-repeat;
}

.wrap-review {
  padding-top: 50%;
  padding-left: 50%;
  transform: translateY(-50%) translateX(-25%);
}

.review {
  background-color: #161d27;
  padding: 40px 100px;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 10px #000;
}

.review-title {
  font-size: 30px;
  font-family: "Suranna", serif;
  margin-bottom: 20px;
}
</style>
