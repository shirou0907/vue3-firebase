<template>
  <div class="wrap-profile">
    <div class="profile-title">User Profile</div>
    <hr />
    <div class="profile-body row">
      <div class="col col-md-6">
        <div class="user-img">
          <img :src="user.photoURL" alt="" width="160" />
        </div>
        <div class="profile-name">
          <div class="p-title">Display Name</div>
          <div class="p-text p-text-active">
            <input
              v-model="name"
              @click="name = user.displayName"
              type="text"
              :placeholder="user.displayName"
            />
          </div>
        </div>
      </div>
      <div class="col col-md-6">
        <div class="profile-id">
          <div class="p-title">ID</div>
          <div class="p-text">{{ user.uid }}</div>
        </div>
        <div class="user-auth">
          <div class="p-title">Provider</div>
          <div class="p-text">{{ user.providerData[0].providerId }}</div>
        </div>

        <div class="profile-email">
          <div class="p-title">Email</div>
          <div class="p-text">{{ user.providerData[0].email }}</div>
        </div>
        <div class="user-verified">
          <div class="p-title">Verify</div>
          <div class="p-text">{{ user.emailVerified }}</div>
          <div v-if="!isVerify" class="btn btn-success" @click="verifyUser()">
            Verify
          </div>
          <button
            v-if="isVerify"
            class="btn btn-success"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      </div>
      <div class="profile-img">
        <div class="p-title">Change Photo</div>
        <div class="p-text p-text-active">
          <input
            style="width: 100%"
            v-model="photo"
            type="text"
            placeholder="Input your photo URL"
          />
        </div>
        <img :src="photo" alt="" width="160" style="margin-bottom: 20px;" />
      </div>
      <div v-if="!isLoading" class="btn btn-success" @click="changeProfile()">
        Change
      </div>
      <button v-if="isLoading" class="btn btn-success" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
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

const isLoading = ref(false);
const changeProfile = async () => {
  isLoading.value = true;
  await store.dispatch("updateUser", {
    name: name.value || user.value.displayName,
    photo: photo.value || user.value.photoURL,
  });
  isLoading.value = false;
};

const isVerify = ref(false);
const verifyUser = async () => {
  isVerify.value = true;
  await store.dispatch("verifyUser");
  isVerify.value = false;
};
</script>
<style scoped>
.profile-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-body {
  padding: 0 20px 20px 20px;
}

.p-title {
  font-size: 16px;
  font-weight: bold;
}

.p-text {
  margin-bottom: 12px;
  padding-left: 12px;
  color: #999;
}

.p-text input {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 6px;
  outline: none;
}

.p-text-active {
  color: var(--text-color);
  padding: 0;
}

.user-img img {
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
