<template>
  <div class="w-full h-screen main-header" v-if="userData">
    <NavBar />
    <div class="w-full my-auto flex main-dashboard" v-if="isAuthenticated">
      <div class="flex flex-col py-2 px-4 menu-width border-r h-full">
        <div class="mx-auto mb-5 w-4/5">
          <div
            class="
              flex
              justify-between
              items-center
              text-center text-white
              border-b
            "
          >
            <p>User role</p>
            <p>{{ userData.role }}</p>
          </div>
        </div>
        <div class="m-auto flex justify-between items-center w-4/5 my-2">
          <img
            class="w-10 h-10 rounded-full"
            :src="userData.photo_link"
            alt="profile"
          />
          <div class="text-white">
            {{ userData ? `${userData.name}` : "no user" }}
          </div>
        </div>
        <dashboardItem
          :roleCheck="true"
          :userData="userData"
          @click="currentItem = 'profile'"
        >
          <template #text>profile</template>
        </dashboardItem>
        <dashboardItem
          :roleCheck="userData.role != 'member'"
          :userData="userData"
          @click="currentItem = 'users'"
        >
          <template #text>users</template>
        </dashboardItem>
        <dashboardItem
          :roleCheck="true"
          :userData="userData"
          @click="currentItem = 'posts'"
        >
          <template #text>posts</template>
        </dashboardItem>
        <dashboardItem
          :roleCheck="true"
          :userData="userData"
          @click="currentItem = 'requests'"
        >
          <template #text>requests</template>
        </dashboardItem>
        <button class="w-full mx-auto flex justify-center" @click="signOutUser">
          <div class="w-full flex justify-center">
            <div
              class="
                log-out
                px-4
                py-2
                rounded-lg
                flex
                justify-center
                text-center
                items-center
                w-5/6
                text-white
                border
                hover:cursor-pointer
              "
            >
              <font-awesome-icon
                class="mr-1"
                :icon="['fa-solid', 'fa-sign-out']"
                width="15px"
              />
              <p class="w-1/2">Logout</p>
            </div>
          </div>
        </button>
      </div>
      <div class="w-full main-header" v-if="currentItem == 'users'">
        <addUser :userData="userData" :uid="uid" />
        <showUsers :userData="userData" :users="users" />
      </div>
      <div class="w-full main-header" v-if="currentItem == 'profile'">
        <profileComponent :userData="userData" :uid="uid"></profileComponent>
      </div>
      <div class="w-full main-header" v-if="currentItem == 'requests'">
        <RequestsComponentVue
          :userData="userData"
          :uid="uid"
          :adminPosts="adminPosts"
          :headPosts="headPosts"
          :requests="requests"
        ></RequestsComponentVue>
      </div>
      <div class="w-full main-header" v-if="currentItem == 'posts'">
        <PostsComponentVue :userData="userData" :uid="uid"></PostsComponentVue>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { signOut } from "firebase/auth";
import { auth } from "../assets/utilities/firebase";
import dashboardItem from "../components/dashboardItem.vue";
import addUser from "../components/addUser.vue";
import showUsers from "../components/showUsers.vue";
import profileComponent from "../components/profileComponent.vue";
import RequestsComponentVue from "@/components/RequestsComponent.vue";
import PostsComponentVue from "@/components/PostsComponent.vue";

export default {
  data() {
    return {
      currentItem: "profile",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    userData() {
      return this.$store.state.userData;
    },
    uid() {
      return this.$store.state.uid;
    },
    users() {
      return this.$store.state.users;
    },
    requests() {
      return this.$store.state.requests;
    },
    adminPosts() {
      return this.$store.state.adminPosts;
    },
    headPosts() {
      return this.$store.state.headPosts;
    },
  },
  beforeMount() {
    if (!this.userData) {
      this.signOutUser();
    }
  },
  components: {
    NavBar,
    dashboardItem,
    addUser,
    showUsers,
    profileComponent,
    RequestsComponentVue,
    PostsComponentVue,
  },
  methods: {
    signOutUser() {
      signOut(auth).then(() => {
        this.$store.commit("setIsAuthenticated", false);
        this.$store.commit("setUserData", null);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style>
.profile:hover {
  color: rgba(1, 24, 66, 0.5);
  background-color: #fcfcfc;
  transition: all 0.3s;
}
.menu-width {
  width: 25%;
  font-size: 20px;
}
.main-dashboard {
  flex-direction: row;
}
@media (min-width: 968px) and (max-width: 1199px) {
  .menu-width {
    width: 70%;
    font-size: 18px;
  }
  .main-dashboard {
    flex-direction: column;
  }
}
@media (max-width: 968px) {
  .menu-width {
    width: 100%;
    font-size: 15px;
  }
  .main-dashboard {
    flex-direction: column;
  }
}
</style>