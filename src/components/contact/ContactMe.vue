<template>
  <base-fragment>
    <div class="contact-top">
      <div class="contact-top-l"></div>
      <img src="@/assets/img/meal-top.png" alt="" />
      <h1>Contact Me</h1>
    </div>
    <div class="wrap-me container">
      <div class="contact-body row">
        <div class="col col-md-6">
          <div class="contact-body-left">
            <div class="c-title">Get in Touch</div>
            <div class="c-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos cum
              perferendis culpa perspiciatis officia sapiente dolorem nihil at
              dolor minus vel, neque reprehenderit repellendus aliquid vero
              reiciendis deserunt dolorum recusandae.
            </div>
            <div class="c-info">
              <div class="c-info-item">
                <font-awesome-icon id="icon" :icon="['fas', 'location-dot']" />
                <div class="c-p">
                  <p>I'm Here</p>
                  <p>Contact me if you need!</p>
                </div>
              </div>
              <div class="c-info-item">
                <font-awesome-icon id="icon" :icon="['fas', 'envelope']" />
                <div class="c-p">
                  <p>Mail Me</p>
                  <p>tungpt244@gmail.com</p>
                </div>
              </div>
              <div class="c-info-item">
                <font-awesome-icon id="icon" :icon="['fas', 'phone']" />
                <div class="c-p">
                  <p>Or My Phone Number</p>
                  <p>+84 379 000 135</p>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-body-right"></div>
        </div>
        <div class="col col-md-6">
          <div class="contact-form">
            <input type="text" placeholder="Your Name *" />
          </div>
          <div class="contact-form">
            <input type="text" placeholder="Your Email *" />
          </div>
          <div class="contact-form">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Message..."
            ></textarea>
          </div>
          <div class="contact-btn">SEND A MESSAGE</div>
        </div>
      </div>
    </div>
  </base-fragment>
</template>
<script setup>
import BaseFragment from "@/components/base/BaseFragment.vue";
</script>
<style scoped>
.wrap-me {
  padding: 60px 0;
}

.contact-top img {
  transform: scaleX(-1);
}

.contact-top-l {
  background: url("@/assets/img/meal-bt.png") center / cover no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.contact-top h1 {
  position: absolute;
  top: 45%;
  left: 50%;
  font-family: var(--main-font-2);
  font-weight: 900;
  transform: translateX(-50%) translateY(-50%);
  font-size: 60px;
}

.c-title {
  font-size: 60px;
  font-family: var(--main-font-2);
  text-shadow: 0 1px #000;
}

.c-description {
  margin: 20px 0;
  font-style: italic;
}

.c-info-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.c-info-item #icon {
  font-size: 30px;
  color: var(--vue-color-1);
  margin-right: 12px;
  width: 40px;
  text-align: center;
}

.c-info-item p {
  margin: 0;
  margin-left: 12px;
  cursor: pointer;
}

.c-p p:first-child {
  font-weight: 600;
}

.c-p p:last-child:hover {
  color: var(--vue-color-1);
}

.contact-form input,
textarea {
  outline: none;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 16px;
  margin-bottom: 20px;
  width: 100%;
}

.contact-btn {
  padding: 14px 16px;
  background-color: var(--vue-color-1);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  width: 200px;
  text-align: center;
}

.contact-btn:hover {
  background-color: var(--vue-color-2);
}
</style>
