<template>
  <base-fragment>
    <base-wave>
      <main-notification :show="show" :message="message"></main-notification>
      <div class="wrap-login">
        <div class="redirect-back" @click="$router.push('/login')">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </div>
        <div class="login-head">
          <div class="login-title">Register</div>
          <div class="login-title-p">
            Register and start discovery world food!
          </div>
        </div>
        <div class="login-form">
          <div class="login-control">
            <input
              class="login-input"
              type="text"
              name="email"
              v-model="name"
              autocomplete="off"
            />
            <label :class="[name ? 'login-hidden' : 'login-label']" for="name">
              Name
            </label>
          </div>
          <div class="login-control">
            <input
              class="login-input"
              type="text"
              name="email"
              v-model="email"
              autocomplete="off"
            />
            <label
              :class="[email ? 'login-hidden' : 'login-label']"
              for="email"
            >
              Email
            </label>
          </div>
          <div class="login-control">
            <input
              class="login-input"
              :type="[type ? 'password' : 'text']"
              name="password"
              v-model="password"
              autocomplete="off"
            />
            <label
              :class="[password ? 'login-hidden' : 'login-label']"
              for="password"
              >Password</label
            >
            <div class="hidden-icon" @click="type = !type">
              <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </div>
          </div>
          <div class="login-control">
            <input
              class="login-input"
              :type="[type ? 'password' : 'text']"
              name="password"
              v-model="confirmPassword"
              autocomplete="off"
            />
            <label
              :class="[confirmPassword ? 'login-hidden' : 'login-label']"
              for="confirmPassword"
              >Confirm password</label
            >
            <div class="hidden-icon" @click="type = !type">
              <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </div>
          </div>
          <div class="login-control">
            <button class="btn-login" @click="register()">Register</button>
          </div>
        </div>
      </div>
    </base-wave>
    <main-loading v-if="isLoading"></main-loading>
    <div class="modal" v-if="isLoading"></div>
  </base-fragment>
</template>
<script setup lang="ts">
import MainLoading from "@/components/loading/MainLoading.vue";
import MainNotification from "@/components/popup/MainNotification.vue";
import BaseWave from "@/components/base/BaseWave.vue";
import BaseFragment from "@/components/base/BaseFragment.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const type = ref(false);
const show = ref(false);
const message = computed(() => {
  return { value: store.getters.getMessage, type: store.getters.getType };
});

const register = async (): Promise<void> => {
  isLoading.value = true;
  await store.dispatch("createUser", {
    email: email.value,
    password: password.value,
    name: name.value,
  });
  isLoading.value = false;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 2500);
};
</script>
<style scoped>
.modal {
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1;
}
.redirect-back {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}
.wrap-login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: auto;
  display: flex;
  min-width: 480px;
  justify-content: center;
  align-items: stretch;
  min-height: 50%;
  padding: 20px;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 8px 12px #000;
  background-color: #35495e;
  z-index: 1;
}
.login-form {
  margin-top: 10px;
  padding: 12px 24px;
}

.login-head {
  text-align: center;
}

.login-title {
  font-size: 60px;
  font-family: var(--main-font);
}
.login-title-p {
  font-size: 14px;
  margin-top: 10px;
}

.hidden-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  cursor: pointer;
}

.login-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  z-index: 1;
  color: #fff;
  transition: all 0.2s ease-in;
  font-size: 14px;
  padding: 0 4px;
}

.login-control {
  margin: 20px 10px;
}

.login-input {
  background-color: #35495e;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 10px 13px;
  width: 100%;
  color: #fff;
  outline: none;
}

.login-input:focus + .login-label {
  top: -2px;
  font-size: 16px;
  background-color: #35495e;
}

.login-hidden {
  display: none;
}

.btn-login {
  background-color: #41b883;
  display: block;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  width: 100%;
  color: #fff;
}

.login-oauth {
  display: flex;
  justify-content: space-around;
}
.login-oauth-btn {
  padding: 8px 10px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 6px #000;
  font-size: 14px;
  width: 48%;
}
.login-oauth-btn img {
  height: 32px;
}
</style>
