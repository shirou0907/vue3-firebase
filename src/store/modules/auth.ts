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
import { auth } from "@/firebase/config";
import { createOrUpdate, updateData } from "@/repository/firestore/index.js";
import type { ActionContext } from "vuex";
import type { User } from "@/interface";

interface State {
  user: object | null;
  isLogin: boolean;
}

const authz: State = JSON.parse(localStorage.getItem("auth") || "");
const moduleAuth = {
  namespace: true,
  state: () => ({
    user: authz ? authz.user : null,
    isLogin: authz ? authz.isLogin : false,
  }),
  mutations: {
    setUser(state: State, user: object) {
      state.user = user;
    },
    setLogin(state: State, payload: boolean) {
      state.isLogin = payload;
    },
  },
  getters: {
    getUser(state: State) {
      return state.user;
    },
    getStatus(state: State) {
      return state.isLogin;
    },
  },
  actions: {
    async checkUser({ commit }: ActionContext<State, State>) {
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

    async createUser(
      { dispatch }: ActionContext<State, State>,
      { email, password, name }: User
    ) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          await updateProfile(user.user, {
            displayName: name,
            photoURL:
              "https://img.icons8.com/wired/64/undefined/walter-white.png",
          });
          dispatch("success", "User created!");
        }
      } catch (error) {
        dispatch("error", (error as Error).message);
      }
    },

    async updateUser(
      { dispatch }: ActionContext<State, State>,
      { name, photo }: User
    ) {
      const user: any = auth.currentUser;
      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
        dispatch("success", "User created!");
      } catch (error) {
        dispatch("error", (error as Error).message);
      }
    },

    async loginWithEmail(
      { commit, dispatch }: ActionContext<State, State>,
      { email, password }: User
    ) {
      try {
        const user: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          console.log(user);
          await createOrUpdate("users", { active: true }, user.uid);
          commit("setLogin", true);
          dispatch("success", "Login Success!");
        }
      } catch (error) {
        dispatch("error", (error as Error).message);
      }
    },

    async loginWithGoogle({ commit, dispatch }: ActionContext<State, State>) {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        commit("setLogin", true);
        dispatch("success", "Login Success!");
      } catch (error) {
        dispatch("error", (error as Error).message);
      }
    },

    async loginWithFaceBook({ commit, dispatch }: ActionContext<State, State>) {
      try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        console.log(accessToken);
        commit("setLogin", true);
        dispatch("success", "Login Success!");
      } catch (error) {
        dispatch("error", (error as Error).message);
      }
    },

    async logout({ commit, dispatch }: ActionContext<State, State>) {
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

    async verifyUser({ dispatch }: ActionContext<State, State>) {
      const user: any = auth.currentUser;
      sendEmailVerification(user).then(() => {
        dispatch("success", "Verification email sent!");
      });
    },
  },
};

export default moduleAuth;
