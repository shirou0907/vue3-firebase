<template>
  <BaseFragment img="home-story">
    <div class="row">
      <img
        src="@/assets/img/spices-left.png"
        alt=""
        class="story-left col col-md-3"
      />
      <div class="story-thanks col col-md-6 col-sm-12">
        <div class="wrap-thank">
          <div>
            <div class="story-title">Our Story</div>
            <div class="story-p">LOVE YOUR FOOD</div>
          </div>
          <div class="story-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            nesciunt numquam, obcaecati mollitia suscipit eligendi. Officia in
            hic aspernatur corporis, dolores animi eveniet commodi labore vero
            explicabo molestiae fugit deserunt.
          </div>
        </div>
      </div>
      <img
        src="@/assets/img/spices-right.png"
        alt=""
        class="story-right col col-md-3"
      />
    </div>
  </BaseFragment>
</template>
<script setup>
import BaseFragment from "@/components/base/BaseFragment.vue";
</script>
<style scoped>
.wrap-fragment {
  background: url("@/assets/img/home-story.jpg") center / cover no-repeat;
  padding: 40px 120px;
}

.story-thanks {
  padding: 20px 60px;
  text-align: center;
}

.wrap-thank {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 8px 20px #000;
  padding: 20px 40px;
  height: 100%;
  border: 18px solid rgb(8, 17, 68);
  background: url("@/assets/img/menu.png") center / contain no-repeat;
}
.story-title {
  font-size: 60px;
  font-family: "Montez", cursive;
}
.story-p {
  font-family: "Suranna", serif;
  font-size: 36px;
  color: #6d4b0c;
}
.story-description {
  margin-top: 60px;
  font-style: italic;
  font-family: "Montez", cursive;
  font-size: 20px;
}
.story-right {
}
</style>
