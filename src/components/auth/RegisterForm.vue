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
    <div class="form-control">
      <label for="email">Name</label>
      <input type="text" name="name" v-model="name" />
    </div>
    <button @click="register()">Register</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  isLoading.value = false;
  await store.dispatch("createUser", {
    email: email.value,
    password: password.value,
    name: name.value,
  });
  isLoading.value = false;
};
</script>
<style></style>
