<template>
  <BaseFragment>
    <div class="catering">
      <swiper
        class="swiper"
        :modules="modules"
        :loop="true"
        :pagination="{ clickable: true }"
      >
        <swiper-slide
          class="wrap-catering"
          v-for="(data, index) in datas"
          :key="index"
        >
          <div class="row">
            <div class="catering-image col col-md-6 col-sm-12">
              <img :src="`/img/${data.img}.jpg`" alt="" />
            </div>
            <div class="catering-intro col col-md-6 col-sm-12">
              <div class="catering-p">Catering</div>
              <div class="catering-title">{{ data.title }}</div>
              <div class="catering-type">
                <span v-for="(type, index) in data.type" :key="index">
                  <i class="fa-solid fa-circle"></i> {{ type }}
                </span>
              </div>
              <div class="catering-description">{{ data.description }}</div>
              <router-link to="/" class="catering-detail"
                >More Details >></router-link
              >
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </BaseFragment>
</template>
<script setup lang="ts">
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref } from "vue";
import { Pagination, Autoplay } from "Swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css";
import "swiper/css/pagination";
const modules = [Pagination, Autoplay];

interface CateringData {
  img: string;
  title: string;
  type: string[];
  description: string;
}

const datas = ref<CateringData[]>([
  {
    title: "Special events",
    type: ["Weddings", "Anniversaires", "Baby showers"],
    description:
      "Celebrate your special event in beautiful atmosphere of Royal Plate.  Exquisite & creative cousine, friendly atmosphere and highly professional staff will make your special day beautiful & enjoyable. You can select from couple of pre-made menus for every occasion that should please many different palates or work with us to create your own menu.",
    img: "cater-1",
  },
  {
    title: "Social events",
    type: ["Birthdays", "Family reunion", "Or just because"],
    description:
      "Weather you are celebrating your birthday, have a family reunion or something else, we’ll make it enjoying and memorable. Our experts have years of experience in party planning and will make sure it is a delicious success, enjoying and memorable for you and your guests! Time to put your party hat on!",
    img: "cater-2",
  },
  {
    title: "Corporate events",
    type: ["Meetings", "Team buildings", "Corporate parties"],
    description:
      "Planning an important business meeting with your partners? Impress them with lunch in Royal Plate.Royal Plate covers everything from business lunches, to custom team building programs and corporate parties. No matter of party size and occasion, our catering specialist will plan your event to meet your needs.",
    img: "cater-3",
  },
]);
</script>
<style scoped>
.wrap-fragment {
  padding: 120px;
  text-align: center;
}

.wrap-catering {
  cursor: grabbing;
}
.catering-image img {
  width: 100%;
}

.catering-p {
  font-size: 40px;
  color: #b48c80;
  font-family: "Montez", cursive;
}

.catering-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
}
.catering-title {
  font-size: 30px;
  text-transform: uppercase;
  font-family: "Suranna", serif;
  padding-bottom: 20px;
  border-bottom: 1px solid #000;
}
.catering-type {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 12px;
}

.catering-type span {
  display: flex;
  align-items: center;
}
.catering-type i {
  font-size: 8px;
  margin: 8px;
}
.catering-description {
  font-size: 14px;
  font-style: italic;
  margin-top: 20px;
  line-height: 1.5rem;
  font-family: "Montserrat-UltraLight', Arial, sans-serif";
}

.catering-detail {
  font-size: 26px;
  text-transform: uppercase;
  font-family: "Suranna", serif;
  margin-top: 20px;
  font-style: oblique;
  color: #b48c80;
}
</style>

<style>
.swiper-pagination {
  padding-left: 50%;
}

.swiper-pagination-bullet {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-color: #b48c80;
}

.swiper-pagination-bullet-active {
  width: 16px;
  height: 16px;
  display: inline-block;
}
</style>
