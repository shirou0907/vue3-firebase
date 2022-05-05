<template>
  <div>
    <div class="form-control">
      <label for="email">Email</label>
      <input type="text" name="email" v-model="email" />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
    </div>
    <button @click="loginWithEmail()">Login</button>
    <button @click="loginWithGoogle()">Login with Google</button>
    <button @click="loginWithFacebook()">Login with Facebook</button>
    <button @click="logout()">Logout</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(false);
const email = ref("");
const password = ref("");

const loginWithEmail = async () => {
  isLoading.value = true;
  await store.dispatch("loginWithEmail", {
    email: email.value,
    password: password.value,
  });
  isLoading.value = false;
};

const loginWithGoogle = async () => {
  isLoading.value = true;
  await store.dispatch("loginWithGoogle");
  isLoading.value = false;
};

const loginWithFacebook = async () => {
  isLoading.value = true;
  await store.dispatch("loginWithFaceBook");
  isLoading.value = false;
};

const logout = () => {
  store.dispatch("logout");
};
</script>
<style></style>
