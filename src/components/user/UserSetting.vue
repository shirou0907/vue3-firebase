<template>
  <div class="wrap-profile">
    <div class="profile-title">User Profile</div>
    <div class="profile-body">
      <div class="profile-id">{{ user.providerData[0].uid }}</div>
      <div class="user-auth">{{ user.providerData[0].providerId }}</div>
      <div class="profile-name">
        {{ user.displayName }}
        <input
          v-model="name"
          @click="name = user.displayName"
          type="text"
          placeholder="Input your name"
        />
      </div>
      <div class="profile-email">{{ user.providerData[0].email }}</div>
      <div class="user-verified">{{ user.emailVerified }}</div>
      <button @click="verifyUser()">Verify</button>
      <input
        v-model="photo"
        @click="photo = user.photoURL"
        type="text"
        placeholder="Input your photo url"
      />
      <div class="user-img"><img :src="user.photoURL" alt="" /></div>
    </div>
    <button @click="changeProfile()">Change</button>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
const store = useStore();
const user = computed(() => {
  return store.getters.getUser;
});
const name = ref("");
const photo = ref("");

const changeProfile = async () => {
  await store.dispatch("updateUser", {
    name: name.value,
    photo: photo.value,
  });
};

const verifyUser = async () => {
  await store.dispatch("verifyUser");
};
</script>
<style scoped>
.profile-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
