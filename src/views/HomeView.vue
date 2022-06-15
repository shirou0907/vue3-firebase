<script setup>
import HomeStory from "../components/home/HomeStory.vue";
import HomeReview from "../components/home/HomeReview.vue";
import HomeCatering from "../components/home/HomeCatering.vue";
import HomeContact from "../components/home/HomeContact.vue";
// import HomeSilde from "../components/home/HomeSilde.vue";
import { checkPosition } from "@/composable/checkScroll.js";
const { x, y } = checkPosition();
</script>

<template>
  <div class="wrap-home">
    <div class="home-layer">
      <div class="home-intro">
        <div class="home-intro-p">Discovery</div>

        <!-- <div class="home-intro-cook">
          <img src="@/assets/img/dinner.png" alt="" />
        </div> -->
        <div class="home-intro-title">
          If you are a chef, no matter how good a chef you are, it's not good
          cooking for yourself; <br />the joy is in cooking for others.
        </div>
        <div class="home-intro-title">{{ x }} x {{ y }}</div>
      </div>
      <div class="home-img">
        <img class="home-img-left" src="@/assets/img/home-left.png" alt="" />
        <img class="home-img-right" src="@/assets/img/home-right.png" alt="" />
        <!-- <img
          class="home-img-bottom"
          src="@/assets/img/home-bottom.png"
          alt=""
        /> -->
      </div>
    </div>

    <HomeStory />
    <HomeContact />
    <!-- <HomeSilde /> -->
    <HomeCatering />
    <HomeReview />
  </div>
</template>

<style scoped>
.home-layer {
  background: url("@/assets/img/homez.jpg") center / cover no-repeat;
  height: 100vh;
}

.home-intro {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  text-align: center;
  z-index: 1;
  padding: 20px;
  color: #fff;
  text-shadow: 0 1px #000;
}

.home-intro-p {
  font-size: 80px;
  font-family: var(--main-font-1);
}

.home-intro-title {
  font-size: 20px;
}
/* .home-intro-cook img {
  width: 52px;
} */

/* .home-intro-cook::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 10px;
  left: 14px;
  transform: translateY(-50%);
  border-top: 1px solid #fcda9a;
  border-bottom: 2px solid #fcda9a;
  width: 120px;
}
.home-intro-cook::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 14px;
  height: 10px;
  transform: translateY(-50%);
  border-top: 1px solid #fcda9a;
  border-bottom: 2px solid #fcda9a;
  width: 120px;
} */
.home-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}
.home-img-left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
}

.home-img-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
}
.home-img-bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
