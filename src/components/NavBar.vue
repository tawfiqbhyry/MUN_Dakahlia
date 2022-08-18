<template>
  <div
    style="margin: 0 8.5% 10px"
    class="
      w-5/6
      px-4
      py-2
      flex
      justify-between
      rounded-lg
      text-1xl
      main-header
      text-white
      navbar
    "
    :style="sticky ? 'position: fixed;top: 2rem;z-index: 1000' : ''"
  >
    <div class="flex w-1/5">
      <router-link to="home">
        <img
          src="../assets/images/logo.jpg"
          alt="logo image"
          class="rounded-full shadow-md w-16 logo-image"
        />
      </router-link>
    </div>

    <div class="w-1/3 flex justify-end">
      <div
        class="
          mx-2
          px-2
          w-full
          flex
          rounded-lg
          text-center
          justify-center
          items-center
          main-button
        "
        v-if="isLoggedIn"
      >
        <router-link to="/dashboard">Dashboard</router-link>
      </div>
      <div
        class="
          mx-2
          px-2
          w-full
          flex
          justify-between
          rounded-lg
          text-center
          shadow-lg
          main-button
          text-1xl
          align-middle
        "
        v-if="!isLoggedIn"
        @click="showLogin = true"
      >
        <p class="flex justify-between w-full m-auto">
          Login
          <font-awesome-icon
            class="ml-2"
            :icon="['fa', 'fa-sign-in']"
            width="25px"
          />
        </p>
      </div>
      <div class="fit mx-2 justify-between align-middle li-pages">
        <div
          class="
            flex
            text-center
            mt-1
            justify-center
            align-middle
            hover:text-blue-700
            pages
            ml-2
          "
          v-for="item in items"
          :key="item.to"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fa-solid', 'fa-angle-down']"
            width="15px"
          />
          <p class="flex justify-center w-full m-auto flex-col">
            <router-link :to="item.to">{{ item.name }}</router-link>
          </p>
        </div>
      </div>
      <div class="w-1/6 mx-2 justify-between align-middle li-bars relative">
        <div class="w-full flex justify-center align-middle">
          <font-awesome-icon
            class="mr-1"
            :icon="['fa-solid', 'fa-bars']"
            width="25px"
          />
          <teleport to="body" v-if="showLogin">
            <ReusableComponent @close="showLogin = false">
              <template #body>
                <h1 class="w-full mx-auto text-2xl text-center text-white">
                  Login
                </h1>
                <form @submit.prevent="login">
                  <div
                    class="
                      w-5/6
                      m-auto
                      flex
                      justify-between
                      mt-4
                      items-center
                      text-white
                    "
                  >
                    <font-awesome-icon
                      class="ml-2"
                      :icon="['fa', 'fa-envelope']"
                      width="25px"
                    />
                    <input
                      type="email"
                      v-model="email"
                      class="
                        border
                        rounded-lg
                        w-5/6
                        text-gray-400
                        m-auto
                        py-2
                        px-4
                      "
                      placeholder="enter your email"
                    />
                  </div>
                  <div
                    class="
                      w-5/6
                      m-auto
                      flex
                      justify-between
                      mt-4
                      items-center
                      text-white
                    "
                  >
                    <font-awesome-icon
                      class="ml-2"
                      :icon="['fa', 'fa-key']"
                      width="25px"
                    />
                    <input
                      type="password"
                      v-model="password"
                      class="
                        border
                        rounded-lg
                        w-5/6
                        text-gray-400
                        m-auto
                        py-2
                        px-4
                      "
                      placeholder="enter your password"
                    />
                  </div>
                  <div
                    class="
                      w-full
                      mx-auto
                      flex
                      justify-center
                      mt-4
                      items-center
                      text-white
                    "
                    v-if="error"
                  >
                    error signing in please try again
                  </div>
                  <div
                    class="
                      py-2
                      mt-4
                      mx-auto
                      bg-white
                      w-1/3
                      text-gray-400
                      flex
                      text-center
                      border
                      rounded-lg
                      items-center
                      justify-center
                      login-btn
                    "
                  >
                    <button type="submit">
                      <p class="flex justify-center w-full m-auto">
                        Login
                        <font-awesome-icon
                          class="ml-2"
                          :icon="['fa', 'fa-sign-in']"
                          width="25px"
                        />
                      </p>
                    </button>
                  </div>
                </form>
              </template>
            </ReusableComponent>
          </teleport>
        </div>
        <teleport to="body" v-if="showItems">
          <ReusableComponent @close="showItems = false" class="rounded-lg">
            <template #body>
              <div
                class="
                  text-center text-white text-2xl
                  py-3
                  mt-1
                  hover:text-blue-700
                  pages
                  ml-2
                "
                v-for="item in items"
                :key="item.to"
              >
                <router-link
                  :to="item.to"
                  class="justify-center items-center flex"
                >
                  <p>
                    {{ item.name }}
                  </p>
                  <font-awesome-icon
                    class="ml-3"
                    :icon="['fa-solid', 'fa-angle-down']"
                    width="15px"
                  />
                </router-link>
              </div>
            </template>
          </ReusableComponent>
        </teleport>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../assets/utilities/firebase";
import { ref as storageRef, onValue } from "firebase/database";
import ReusableComponent from "./ReusableComponent.vue";
import store from "../assets/store";

export default {
  components: {
    ReusableComponent,
  },
  setup() {
    const sticky = ref(false);
    const isLoggedIn = ref(false);
    const currentUser = ref(null);
    const showItems = ref(false);
    const error = ref(false);
    const items = ref([
      { name: "Home", to: "/home" },
      { name: "About", to: "/about" },
      { name: "team", to: "/team" },
      { name: "blog", to: "/blog" },
      { name: "Contact", to: "/contact" },
    ]);
    const email = ref("");
    const password = ref("");
    const showLogin = ref(false);
    onMounted(() => {
      var navbar = document.querySelector(".navbar");
      var itemsShow = document.querySelector(".li-bars");
      itemsShow.addEventListener("click", function () {
        showItems.value = true;
      });
      var stickyOffset = navbar.offsetTop;
      window.onscroll = function () {
        myFunction();
      };
      function myFunction() {
        if (window.pageYOffset / 2 >= stickyOffset) {
          sticky.value = true;
        } else {
          sticky.value = false;
        }
      }
      const postsRef = storageRef(db, "posts");
      onValue(postsRef, (snapshot) => {
        let shownPosts = snapshot.val();
        store.commit("setPosts", shownPosts);
      });
      auth.onAuthStateChanged((user) => {
        if (user) {
          isLoggedIn.value = true;
          currentUser.value = auth.currentUser;
          store.commit("setUser", auth.currentUser);
          store.commit("setIsAuthenticated", true);
          const userId = user.uid;
          const dbRef = storageRef(db, `users/${userId}`);
          onValue(dbRef, (snapshot) => {
            store.commit("setUserData", snapshot.val());
            store.commit("setUid", userId);
          });
          const newDBRef = storageRef(db, `users`);
          onValue(newDBRef, (snapshot) => {
            store.commit("setUsers", snapshot.val());
          });
          let requests = { usersRequests: [], usersDelete: [], usersEdit: [] };
          const usersDelete = storageRef(db, `usersDelete`);
          onValue(usersDelete, (snapshot) => {
            requests.usersDelete = snapshot.val();
            store.commit("setRequests", requests);
          });
          const usersRequests = storageRef(db, `usersRequests`);
          onValue(usersRequests, (snapshot) => {
            requests.usersRequests = snapshot.val();
            store.commit("setRequests", requests);
          });
          const usersEdit = storageRef(db, `usersEdit`);
          onValue(usersEdit, (snapshot) => {
            requests.usersEdit = snapshot.val();
            store.commit("setRequests", requests);
          });
          let adminPostsRequests = {};
          let headPostsRequests = {};

          const adminPostsRequestsRef = storageRef(db, `postsRequests/admin`);
          onValue(adminPostsRequestsRef, (snapshot) => {
            adminPostsRequests = snapshot.val();
            store.commit("setAdminPosts", adminPostsRequests);
          });
          const headPostsRequestsRef = storageRef(db, `postsRequests/head`);
          onValue(headPostsRequestsRef, (snapshot) => {
            headPostsRequests = snapshot.val();
            store.commit("setHeadPosts", headPostsRequests);
          });
        } else {
          isLoggedIn.value = false;
          currentUser.value = null;
          store.commit("setUser", null);
          store.commit("setIsAuthenticated", false);
          store.commit("setUid", "");
        }
      });
    });

    async function login() {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          showLogin.value = false;
        })
        .catch(() => {
          error.value = true;
        });
    }

    return {
      isLoggedIn,
      showLogin,
      sticky,
      showItems,
      items,
      login,
      email,
      password,
      error,
    };
  },
};
</script>

<style>
.pages:hover {
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  border-bottom: 0.5px solid gray;
}
.main-header {
  background-image: linear-gradient(270deg, #011842, #000217);
  -webkit-box-shadow: -2px -1px 15px 7px rgba(1, 24, 66, 0.5);
  -moz-box-shadow: -3px -2px 30px 14px rgba(1, 24, 66, 0.425);
  box-shadow: -4px -3px 45px 21px rgba(1, 24, 66, 0.35);
}
.main-button {
  background-image: linear-gradient(-270deg, #011842, #070817);
  -webkit-box-shadow: -2px -1px 15px 7px rgba(1, 24, 66, 0.5);
  -moz-box-shadow: -3px -2px 30px 14px rgba(1, 24, 66, 0.425);
  box-shadow: -4px -3px 45px 21px rgba(1, 24, 66, 0.35);
}
.main-button:hover {
  cursor: pointer;
  transition: all 0.3s;
  transform: scale(1.3) ease-in-out;
}
.logo-image {
  cursor: pointer;
}
.login-btn:hover {
  cursor: pointer;
  transition: 0.3s;
  transform: scale(1.3) ease-in-out;
}
@media (max-width: 962px) {
  .li-pages {
    display: none;
  }
  .li-bars {
    display: flex;
  }
  .login-element {
    width: 90%;
  }
}
@media (max-width: 2000px) and (min-width: 1199px) {
  .li-pages {
    display: flex;
  }
  .li-bars {
    display: none;
  }
  .login-element {
    width: 50%;
  }
}
@media (max-width: 1199px) and (min-width: 963px) {
  .li-pages {
    display: flex;
  }
  .li-bars {
    display: none;
  }
  .login-element {
    width: 70%;
  }
}
.li-bars:hover {
  cursor: pointer;
}
</style>
