<script setup>
// import { getData, updateData } from "@/repository/firestore";
// getData("products").then((a) => console.log(a));
// updateData("users", { like: [""] }, "adsasdad");
// createOrUpdate("users", { active: true }, "adsasdad");
</script>

<template>
  <div class="wrap-home">
    <div class="home-layer">
      <div class="home-intro">
        <div class="home-intro-p">Discovery</div>
        <div class="home-intro-cook">
          <img src="@/assets/img/dinner.png" alt="" />
        </div>
        <div class="home-intro-title">cooking recipes</div>
      </div>
      <div class="home-img">
        <img class="home-img-left" src="@/assets/img/home-left.png" alt="" />
        <img class="home-img-right" src="@/assets/img/home-right.png" alt="" />
        <img
          class="home-img-bottom"
          src="@/assets/img/home-bottom.png"
          alt=""
        />
      </div>
    </div>
    <div class="home-layer"></div>
  </div>
</template>

<style scoped>
.home-layer {
  background: url("@/assets/img/home.jpg") center / cover no-repeat;
  height: 100vh;
}

.home-intro {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  text-align: center;
}

.home-intro-p {
  font-size: 60px;
  color: #fcda9a;
  font-family: "Montez", cursive;
}

.home-intro-title {
  font-size: 50px;
  text-transform: uppercase;
  color: #fff;
  font-family: "Suranna", serif;
}
.home-intro-cook img {
  width: 52px;
}

.home-intro-cook::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translateY(-50%);
  border-top: 2px solid #ccc;
  width: 120px;
}
.home-intro-cook::before {
  content: "";
  position: absolute;
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
  border-top: 2px solid #ccc;
  width: 120px;
}
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
