<template>
  <base-fragment class="row">
    <div class="col col-md-4">
      <div class="user-option">
        <div class="user-title">Setting</div>
        <hr />
        <div class="user-link">
          <router-link class="link-item" :to="{ name: 'profile' }"
            >Change Profile</router-link
          >
          <router-link class="link-item" :to="{ name: 'liked' }"
            >Meal Liked</router-link
          >
        </div>
      </div>
    </div>
    <div class="col col-md-8">
      <div class="user-dialog">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </base-fragment>
</template>
<script>
import BaseFragment from "@/components/base/BaseFragment.vue";
export default {
  components: {
    BaseFragment,
  },
  data() {
    return {
      a: 1,
    };
  },
};
</script>
<style scoped lang="scss">
.wrap-fragment {
  padding: 200px 40px;
  background: url("/img/user-profile-bg.jpg") center / cover no-repeat;
  .user-option {
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 8px;
    min-height: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    .user-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .user-link {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 20px;
      .link-item {
        padding: 0 12px;
        margin-bottom: 12px;
        text-decoration: none;
        color: var(--text-color);
      }
    }
  }

  .router-link-active {
    border-left: 4px solid var(--vue-color-1);
  }

  .user-dialog {
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 8px;
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
