<template>
  <div class="wrap-footer">
    <div class="footer-top">
      <img src="@/assets/img/footer-left.png" class="footer-img-left" alt="" />
      <img
        src="@/assets/img/footer-right.png"
        class="footer-img-right"
        alt=""
      />
    </div>
    <div class="footer">
      <div class="footer-body">
        <div class="body-icon">
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="160"
            height="160"
          />
        </div>
        <div class="body-contact">
          <div class="body-address">
            22 Royal Street, Sundance Avenue, New York
          </div>
          <div class="body-work">
            RESERVATIONS NUMBER:
            <p>+00 25 854 78521</p>
          </div>
          <div class="body-work">
            WORKING HOURS:
            <p>MON- FRI: 08:00 AM - 10:00 PM</p>
            <p>SAT - SUN: 10:00 AM - 11:00 PM</p>
          </div>
        </div>
        <div class="body-line">
          <div class="body-icon">
            <a class="body-link" href="#">
              <font-awesome-icon
                class="icon-link"
                :icon="['fab', 'facebook']"
              />
            </a>
            <a class="body-link" href="#">
              <font-awesome-icon
                class="icon-link"
                :icon="['fab', 'instagram']"
              />
            </a>
            <a class="body-link" href="#">
              <font-awesome-icon class="icon-link" :icon="['fab', 'twitter']" />
            </a>
            <a class="body-link" href="#">
              <font-awesome-icon class="icon-link" :icon="['fab', 'youtube']" />
            </a>
            <a class="body-link" href="#">
              <font-awesome-icon class="icon-link" :icon="['fab', 'github']" />
            </a>
          </div>
          <div class="body-mail">
            <input
              autocomplete="off"
              type="text"
              name="mail"
              id="mail"
              class="input-mail"
              :placeholder="text"
            />
            <div class="btn-mail">SUBSCRIBE</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="bottom-title">
        © Tung Pham Thanh 2022. All rights reserved.
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const text = ref("Subscribe to our newsletter");
</script>
<style scoped>
.wrap-footer {
  background-color: #000;
}

.footer {
  padding: 80px 40px 20px 40px;
}

.footer-img-left {
  position: absolute;
  top: 40px;
  left: 0;
}

.footer-img-right {
  position: absolute;
  top: 40px;
  right: 0;
}

.footer-top img {
  display: block;
}

.footer-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

.body-address {
  color: rgb(182, 174, 174);
  font-size: 14px;
  margin-bottom: 20px;
  font-style: italic;
}

.body-work {
  color: #fcda9a;
  margin-bottom: 12px;
}

.body-work p {
  margin: 0;
  color: rgb(182, 174, 174);
}

.body-line {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.body-link {
  color: #000;
}

.icon-link {
  font-size: 20px;
  padding: 12px;
  margin: 10px;
  width: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.3s linear;
}

.icon-link:hover {
  background-color: #fcda9a;
}

.body-mail {
  display: flex;
  justify-content: space-around;
  height: 36px;
}
.input-mail {
  background-color: rgb(39, 40, 42);
  outline: none;
  border: 1px solid rgb(133, 122, 122);
  padding: 4px 12px;
  min-width: 260px;
  margin-right: 12px;
  color: rgb(182, 174, 174);
}

.btn-mail {
  padding: 4px 12px;
  background-color: #fcda9a;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.footer-bottom {
  border-top: 1px solid rgb(66, 60, 60);
  padding: 12px 40px;
}

.bottom-title {
  color: rgb(182, 174, 174);
}
</style>
