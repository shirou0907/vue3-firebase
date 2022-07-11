<template>
  <base-fragment>
    <base-wave>
      <main-notification :show="show" :message="message"></main-notification>
      <div class="wrap-login">
        <div class="login-head">
          <div class="login-title">Sign in</div>
          <div class="login-title-p">
            Sign in and start discovery world food!
          </div>
        </div>
        <div class="login-form">
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
            <button class="btn-login" @click="loginWithEmail()">Login</button>
          </div>
          <p style="text-align: center">or Connect With Social Media</p>
          <div class="login-oauth">
            <button class="login-oauth-btn" @click="loginWithGoogle()">
              <!-- <font-awesome-icon
                class="google-icon"
                :icon="['fab', 'google']"
              /> -->
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAF7klEQVRoge1ZW2xURRj+Zs6e3W3L9n6hYGltkQK9UCjYcottQoyhT4WEF4QAidGABtBYNRqziZdEkCLG0hhCIIgxLi9oAlIgLFiiLQW7WGnayk3aCi30srTd7p6zZ8YHpCHds2fP6S6XKN/bzvz/P9+3M+ef+WeAp3iK/zdIJIJwO0zwiuvgYZVw80K4eQokiPByCgZABMck4oON9MNGWmCjDljlA8QOf7hjhyWAV4mlGGI70MlK4OaCIWcbUTCNNiKRbiKfyq6JcpiQAP6RJRdd8iF0sIKw/0MBwHP0ItLYSvIxrhh1NyyAv0Or0cy3YJRHZPmNIQYMs+l2Us3eNeKmmwSvRhRa6QW0s1nG2RlALnXhGVZC7JD0mFM9Rnw3EtBMrz108gDQzorgptv0moecAb4PVpwgN9DJU8JjphP55DSp5eV6zUPPQCNtenTkBUPkAcCk1cnfpl+igeXrjmYjCjKpC9H8MNJoPTz+SwAoJFMBJLYEblSim+djSCXl5gtnSK1iiDygsYT4NksOnFIHhnnoWbIRBXl0L2KUN0J9fNyOaAwKu9HBXh4Tco98mVHygJaArUITzivzQ0bIpt2YwYrJ++gxMjD/ADm4Ts/CRtonSh4IIoCficqAn11Gnd+MBgXgQbxn0WYsYwvIKigTJRAugiwPvgkmmFFhAlaLQJSKzmza/bjJAyozwB0QkGb5C8DUsca7HHD4gevs3u9YomAGzyQ70f2oiAZD4AykRj2PB8kDQCwBNohAhene2WUG3f8kkAdU06hSrvppUAALBWAy6cEFedNDZ6YTgQIIKdb0yKIOsg4+vQOkV/0eLAUYQqxpiBfFt179vuqV6Q+2By4hjlzNSBxHI0HIKO76baTbO3nq+PZAAYSkh4h1OVKkjKJPSjCPb1NJo3ySdhjfrUgRMgqP3xrAV9dx+kkBV6mhVASQYc0oJsuUSBEyihjBE5AQVD5iflMzih/ZkaNkDEkWd0D2U/mI0aEZhaIicpSMIcnS3ze+TWUf4E3gpFItQD+zoHYkb0O1A1Vvrvp1VM+gN7cV6qq7tx9YE/Ptn+vdPb7koNczmVHdzePbAmdAEZxqzi3+RGy5uxgNclq0OEmu0UPKCP525+7SIg8AU2J6vxvfFiigbPQcgK77PzmAH71Z+HBoAQaYBQDQIKeuranLzwiX9H3srH0t62TP0vVaNsnmAcWbE+cY3x4ggBAwgBwEgBEu4pOhYuzxzIL/gcLMzcxCl5zY6HSWaZakemB32k1nBhf9ckdK0EzppUm/NdjL7QHXaOpOjNRcUWLlre5FaJRTVU1a5MT0nz3y+XBE2J1205ULk12NA0Wau79I/ci2dG1W61MVQMpHuw55clpvsmhNAk1SypzjI+zG3uO5hveGr0/kTetppe0nexflhbJdnHj+0nsbd1xQ6ws6bXniQGUClVio4C1yYrpzNOfGV8fm7bXvK7OGsj9QVxiz68iCPfUjmddupTdnL518WtM+1jTEc+PbVgTr10xxtUeKqo9KWVv1nofjqaTMNg20xFHf4RTuqzcJ3j+8ZoGNeqNmejl9sY9FL+9Q4ooGmXks2xBOkNRTiOPXV6geFVZMPVZbs7lq44QEAMBnR0qa66X0Ip0aJozUwQycal8L37+ZDgCWJJ9vO1S1QfM6M+Rh7tmR4ZLZwuBDP4H2xneirLAGyeZ+AEBBXFtfSszoglB+unZJpzMr/qQno/WilBSqVggbNtkKsWthd3Zy5zz72s97Q9nrvl53OrOsZz3p585JaQURqRGDYKG5xzWX3C5dvvyyrrLV8CPFnp8Kt53yZbw1xMWI1hKxRGYviN07Xq1wVRnxm9Aryzc/zJveJZodTVLKXMng09h4iGCYb77tyrL0rVy9rOOqUf+wnon21xUU35ajv2hT4kt7WJShHTlJ8PpnCoON0+B9fXWF69E+8o2Hg0MYOlq0xk3ElX3cOueOYk0ZZaJ5GAJlILASP4+D7EugUl+S4L2YQHyO2JdcB1eRx3st+RRP8V/APxpfGCkoT5O8AAAAAElFTkSuQmCC"
              />
              Login with Google
            </button>
            <button class="login-oauth-btn" @click="loginWithFacebook()">
              <!-- <font-awesome-icon
                class="facebook-icon"
                :icon="['fab', 'facebook-f']"
              /> -->
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEg0lEQVRoge2YS2icVRTH/+d+M5N3U9sami8T0GBpjMGKRkZdFVpcVrNoUBpFTTIW4wvdFcUoui0US7F5IIrFVd00biy4EGyFkpaWNMQoiElmGm0eNZkmmZnv3uMiqTSZ+70zgjK/5bn33PM/332d7wIlSpT4T0NbNVB0aHqflDhAJJ5g8F4CGgGqXmvlDDMmiWiCSV00CN/nu+JXtyJuuASGbtYIlU0KUBcDD/oKzBhT4CGVj/Wjty4TVEKwBPo4IuKpN4jpPQA7ggZfZ45BH6tU/Un0keXX2X8Cp9PNQvDXBDzi29cBBq4ogefR1fCzHz9fCRj9qUMgnAFQ7Uudd5ZAOCK7G855dRBeOxqD6RdAOIviiQeAGjC+MQbSnV4dPM3A+pc/CyASWJo/LDC3y2R82K2jewKfTe0xDDECoCaMoooIwaw0UBsjLFuMnGT8uaqQybOdS0YqehyvmuNO4zon0McR0ZC+FHTDEoDDTRV4raUKiboooqIwXPv5eZz7fVXrz8BllTITTqeT45JYPyoDiY8Kwhf7t6OjqcKxn9MXJOBRYd7oVcAJW4223l/OVBHTMVelNnzUVuMq3gtE/D6GbtouX9sERNY6CmBXkKD1lQbeaq0K4qpjp5DZHrtG2yW0Xh4E4nBTOWKa9X4rp3Bq7DamMvIf29W5vOt4AtSlgOO6Nm0C0aHpfUr5q23uJnFvTGt/5rt5/DiT8z0eE1pigzOtue7do5vbtEtIKhz0HeUuGquNAtvofD6Q+DtYSh3Q2bUJEEQicCQAtbHCYa/N+67TNkDET+rs2gQYaA4TzNCcjfNZFWZIMLBXZ7eZATZDRdMLCAUBcZ3d7hgNVTYUCa2m0MXZB4/V4PWWjWf+Ns0eSDZXovOBwott//Asri8E3x92CSwB2OllgAqDcE+Ze1VeZhDKNm0OBvDbktQ76DUVYLOJKe111DBMZiSWLW+7g4Fpnd1mE8OxhN0qJv7yvnQI0P5q6meA1U8BNfli/Jb3BBh0QWfXVrOxgamHJYSnd5uKCKF809q+cGgX9tRu3F4D48s4dmlxg23FYqxKb0vIYNGaS9Zf32zXbuJcT+M1MTA9SqBWt4FXLMbKpnWs07QqGQsBLzNijOnEA07/A4zPA0UrAkrwoF2bbQKqPHIawGxRFPljTmVjA3aN9jPw4u7bDPqkKJJ8wIwPnZ4eHW8glao/ycCVrZflmRG13Tzl1MH5Cu0jS5HqAGPRsV9xyEhFneggx6vavQbobvwVAp0AwhX0/rBA/JzbmxDg8Wlx7a2SXsa/k4QFppdkd/xbL509v43KHvMrMLfDpqjaEhiLIH5WJs0zXl08JwAAMhkflsxtDFz2r86VEalUm9cvfwdfCQAAkvEJlTITzPQ2gDnf/oXMMuNNWWsmcLTxF7/O/hMA1k6npHlC5qL3MfO7DGiveScYPMrE78hc9H6VbPjU7bSxI9wfWW9dZv3B6Xis/8ZDFvggET81mVFPV0flth1lQgDAQlapTF79AeAHZrqoInQer9SPhYpdokSJ/wd/A7yQheTiO82sAAAAAElFTkSuQmCC"
              />
              Login with Facebook
            </button>
          </div>
          <!-- <button @click="logout()">Logout</button> -->
          <div class="login-redirect">
            <p>Want create accout ?</p>
            <router-link :to="{ name: 'register' }" class="login-redirect-btn"
              >Register</router-link
            >
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
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const isLoading = ref<boolean>(false);
const email = ref("");
const password = ref("");
const message = computed(() => {
  return { value: store.getters.getMessage, type: store.getters.getType };
});
const show = ref(false);
const type = ref(true);

const loginWithEmail = async (): Promise<void> => {
  isLoading.value = true;
  await store.dispatch("loginWithEmail", {
    email: email.value,
    password: password.value,
  });
  show.value = true;
  isLoading.value = false;
  message.value.type == "alert-success" ? router.push("/") : console.log("Err");
  setTimeout(() => {
    show.value = false;
  }, 2500);
};

const loginWithGoogle = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await store.dispatch("loginWithGoogle");
    show.value = true;
    isLoading.value = false;
    message.value.type == "alert-success"
      ? router.push("/")
      : console.log("Err");
    setTimeout(() => {
      show.value = false;
    }, 2500);
  } catch (error) {
    isLoading.value = false;
  }
};

const loginWithFacebook = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await store.dispatch("loginWithFaceBook");
    show.value = true;
    isLoading.value = false;
    message.value.type == "alert-success"
      ? router.push("/")
      : console.log("Err");
    setTimeout(() => {
      show.value = false;
    }, 2500);
  } catch (error) {
    isLoading.value = false;
  }
};

// const logout = () => {
//   store.dispatch("logout");
// };
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

.login-redirect {
  display: flex;
  margin-top: 16px;
  justify-content: center;
}
.login-redirect-btn {
  margin-left: 10px;
  color: #fff;
}
</style>
