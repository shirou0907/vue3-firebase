import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "@firebase/auth";
import { auth } from "@/firebase/config.js";

const moduleAuth = {
  state: () => ({
    user: null,
    isLoggin: false,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
      console.log(user);
    },
    setLogin(state, payload) {
      state.isLoggin = payload;
    },
  },
  actions: {
    async checkUser({ commit, dispatch }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setUser", user);
          dispatch("success", "User logged in");
        } else {
          dispatch("error", "User not logged in");
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
          await updateProfile(auth.currentUser, { displayName: name });
          dispatch("success", "User created!");
        }
      } catch (error) {
        dispatch("error", error.message);
      }
    },

    async loginWithEmail({ commit, dispatch }, { email, password }) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
          console.log(user);
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

    async logout({ commit, dispatch }) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          commit("setLogin", false);
          commit("setUser", null);
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
