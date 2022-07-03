<template>
  <base-fragment>
    <div class="b">
      <div class="c c1">
        <div class="a a1">
          <div class="b-p">
            <div class="b-type">DESSERTS</div>
            <div class="b-title">
              ROOT BEER FLOAT CAKE WITH VANILLA ICE CREAM FROSTING
            </div>
            <div class="b-description">
              Why not bring the root beer float to life in cake form? Start with
              root beer concentrate. It contains all the unique flavors found in
              the soda pop in their purest (and most concentrated) form, withou…
            </div>
          </div>
        </div>
        <div class="a a2"></div>
      </div>
      <div class="c c2">
        <div class="a a3">
          <div class="b-p">
            <div class="b-type">LUNCH / DINNER</div>
            <div class="b-title">BOURBON BBQ PULLED PORK</div>
            <div class="b-description">
              This Bourbon BBQ Pulled Pork sandwich is not only delicious, it’s
              fuss-free thanks to the slow cooker.
            </div>
          </div>
        </div>
        <div class="b">
          <div class="c c1">
            <div class="a a41">
              <div class="b-p b-pt">
                <div class="b-type">SIDE DISHES</div>
                <div class="b-title">
                  Red, White & Blue Fruit Salad with Honey-Lime Dressing
                </div>
              </div>
              <img src="/img/r3.jpg" alt="" />
            </div>
          </div>
          <div class="c">
            <div class="a a42">
              <div class="b-p b-pt">
                <div class="b-type">DRINKS</div>
                <div class="b-title">
                  Watermelon & Blackberry Granita with Rum & Mint
                </div>
              </div>
              <img src="/img/r4.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-fragment>
</template>
<script setup>
import BaseFragment from "@/components/base/BaseFragment.vue";
</script>
<style scoped>
.b {
  width: 100%;
  height: 100vh;
  display: flex;
}
.a {
  width: 100%;
}

.c {
  width: 100%;
}

.c1 {
  margin-right: 20px;
}

.a1 {
  height: 75%;
  margin-bottom: 20px;
  background: url("/img/r1.jpg") center / cover no-repeat;
}

.a2 {
  height: 25%;
  background: url("/img/r5.png") center / cover no-repeat;
}

.a3 {
  height: 50%;
  margin-bottom: 20px;
  background: url("/img/r2.jpg") center / cover no-repeat;
}

.a41 {
  height: 50%;
  /* background: url("/img/r3.jpg") center / cover no-repeat; */
}

.a42 {
  height: 50%;
  /* background: url("/img/r4.jpg") center / cover no-repeat; */
}

img {
  width: 100%;
  height: 100%;
}

.b-p {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  text-shadow: 0 0 6px #111;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0)
  );
  z-index: 1;
}

.b-pt {
  top: 0;
  bottom: unset;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0)
  );
}

.b-type {
  font-weight: 900;
  font-family: "brandon-grotesque", sans-serif;
  letter-spacing: 1px;
  color: #dea249;
}

.b-title {
  font-weight: 900;
  font-size: 20px;
  font-family: "brandon-grotesque", sans-serif;
  letter-spacing: 1px;
  color: #fff;
}

.b-description {
  font-family: "roboto", sans-serif;
  color: #fff;
}
</style>
