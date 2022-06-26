import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  FacebookAuthProvider,
} from "@firebase/auth";
import { auth } from "@/firebase/config.js";
import { createOrUpdate, updateData } from "@/repository/firestore/index.js";

const authz = JSON.parse(localStorage.getItem("auth"));
const moduleAuth = {
  namespace: true,
  state: () => ({
    user: authz ? authz.user : null,
    isLogin: authz ? authz.isLogin : false,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLogin(state, payload) {
      state.isLogin = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getStatus(state) {
      return state.isLogin;
    },
  },
  actions: {
    async checkUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setLogin", true);
          commit("setUser", user);
          localStorage.setItem(
            "auth",
            JSON.stringify({ user: user, isLogin: true })
          );
          createOrUpdate("users", { active: true }, user.uid);
          updateData(
            "users",
            { name: user.displayName, photo: user.photoURL },
            user.uid
          );
        } else {
          commit("setLogin", false);
        }
      });
    },

    async createUser({ dispatch }, { email, password, name }) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:
              "https://img.icons8.com/wired/64/undefined/walter-white.png",
          });
          dispatch("success", "User created!");
        }
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async updateUser({ dispatch }, { name, photo }) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        dispatch("success", "User created!");
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async loginWithEmail({ commit, dispatch }, { email, password }) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
          console.log(user);
          await createOrUpdate("users", { active: true }, user.uid);
          commit("setLogin", true);
          dispatch("success", "Login Success!");
        }
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async loginWithGoogle({ commit, dispatch }) {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        commit("setLogin", true);
        dispatch("success", "Login Success!");
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async loginWithFaceBook({ commit, dispatch }) {
      try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(accessToken);
        commit("setLogin", true);
        dispatch("success", "Login Success!");
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async logout({ commit, dispatch }) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          commit("setLogin", false);
          commit("setUser", null);
          localStorage.clear();
          dispatch("success", "Logout Success!");
        })
        .catch((error) => {
          dispatch("error", error.message);
        });
    },

    async verifyUser({ dispatch }) {
      sendEmailVerification(auth.currentUser).then(() => {
        dispatch("success", "Verification email sent!");
      });
    },
  },
};

export default moduleAuth;
