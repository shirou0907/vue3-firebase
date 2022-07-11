<template>
  <base-fragment>
    <blog-slide></blog-slide>

    <div class="wrap-blog">
      <div class="blog-title">What we should eat for a healthy life</div>
      <div class="row">
        <div class="col col-md-6">
          <blog-tab v-bind="data">
            <div class="blog-tab">
              <div
                class="tab-item"
                :class="[i == data.id ? 'tab-item-active' : '']"
                v-for="(tab, i) in listTab"
                :key="i"
                @click="tabActive(i)"
              >
                {{ tab }}
              </div>
            </div>
          </blog-tab>
        </div>
        <div class="col col-md-6">
          <div class="blog-img"></div>
        </div>
      </div>
    </div>

    <home-catering></home-catering>

    <home-review></home-review>
  </base-fragment>
</template>
<script setup lang="ts">
import BlogTab from "@/components/blog/BlogTab.vue";
import HomeCatering from "@/components/home/HomeCatering.vue";
import HomeReview from "@/components/home/HomeReview.vue";
import BlogSlide from "../components/blog/BlogSlide.vue";
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref } from "vue";
const data = ref({
  title: "tab-choose",
  id: 0,
});

const tabActive = (index: number) => {
  data.value.id = index;
};

const listTab = ref(["Breakfast", "Lunch", "Dinner"]);
</script>
<style scoped>
.wrap-blog {
  padding: 30px 40px;
}

.blog-tab {
  display: flex;
  justify-content: left;
  margin: 20px;
}

.blog-title {
  margin-top: 30px;
  font-size: 80px;
  font-family: var(--main-font-1);
  text-align: center;
}

.tab-item {
  padding: 12px 20px;
  font-size: 18px;
  font-family: serif;
  cursor: pointer;
}

.tab-item:hover {
  background-color: rgb(0, 0, 0, 0.05);
}

.tab-item-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000;
  height: 2px;
}

.blog-img {
  background: url("/img/healthy.png") center / cover no-repeat;
  height: 666px;
}
</style>
