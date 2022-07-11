<template>
  <base-fragment>
    <swiper
      class="swiper"
      :modules="modules"
      :loop="true"
      :space-between="6"
      :slides-per-view="4"
      :autoplay="{ delay: 1500, disableOnInteraction: false }"
    >
      <swiper-slide v-for="(data, index) in meals" :key="index">
        <div class="meal-body">
          <div class="meal-img"><img :src="data.img" alt="" /></div>
          <div class="meal-id">{{ data.id }}</div>
          <div class="meal-name">{{ data.name }}</div>
        </div>
      </swiper-slide>
    </swiper></base-fragment
  >
</template>
<script setup lang="ts">
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref } from "vue";
import { Pagination, Autoplay } from "Swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css";
import "swiper/css/pagination";
const modules = [Pagination, Autoplay];
const meals = ref([
  {
    name: "Banana Pancakes",
    img: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
    id: "52855",
  },
  {
    name: "BBQ Pork Sloppy Joes",
    img: "https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg",
    id: "52995",
  },
  {
    name: "Beef Brisket Pot Roast",
    img: "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
    id: "52812",
  },
  {
    name: "Big Mac",
    img: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
    id: "53013",
  },
  {
    name: "Chick-Fil-A Sandwich",
    img: "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
    id: "53016",
  },
  {
    name: "Chicken Fajita Mac and Cheese",
    img: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
    id: "52818",
  },
  {
    name: "Choc Chip Pecan Pie",
    img: "https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg",
    id: "52856",
  },
  {
    name: "Chocolate Raspberry Brownies",
    img: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
    id: "52860",
  },
  {
    name: "Clam chowder",
    img: "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
    id: "52840",
  },
  {
    name: "French Onion Chicken with Roasted Carrots & Mashed Potatoes",
    img: "https://www.themealdb.com/images/media/meals/b5ft861583188991.jpg",
    id: "52996",
  },
  {
    name: "Fruit and Cream Cheese Breakfast Pastries",
    img: "https://www.themealdb.com/images/media/meals/1543774956.jpg",
    id: "52957",
  },
  {
    name: "Grilled Mac and Cheese Sandwich",
    img: "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
    id: "52829",
  },
  {
    name: "Honey Balsamic Chicken with Crispy Broccoli & Potatoes",
    img: "https://www.themealdb.com/images/media/meals/kvbotn1581012881.jpg",
    id: "52993",
  },
  {
    name: "Hot Chocolate Fudge",
    img: "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
    id: "52787",
  },
  {
    name: "Kentucky Fried Chicken",
    img: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
    id: "52813",
  },
  {
    name: "Key Lime Pie",
    img: "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg",
    id: "52859",
  },
  {
    name: "Krispy Kreme Donut",
    img: "https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg",
    id: "53015",
  },
  {
    name: "Lasagna Sandwiches",
    img: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
    id: "52987",
  },
  {
    name: "New York cheesecake",
    img: "https://www.themealdb.com/images/media/meals/swttys1511385853.jpg",
    id: "52858",
  },
  {
    name: "Pancakes",
    img: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    id: "52854",
  },
]);
</script>
<style scoped>
.meal-img img {
  width: 100%;
  height: 400px;
}
</style>
