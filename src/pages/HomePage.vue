<template>
  <div class="w-full main-page h-screen">
    <div class="pt-5 bottom-border">
      <NavBar />
    </div>
    <div class="w-full flex flex-col h-5/6 m-auto relative main-data-page">
      <div class="ml-5 justify-center main-data">
        <div class="mb-2 bold text-3xl">MUN Dakahlia</div>
        <div class="text-2xl">We have a vision</div>
        <div class="text-2xl">To create a better future</div>
        <div class="mt-5 text"></div>
      </div>
      <div>
        <div class="text-white m-arrow">
          <font-awesome-icon
            class="mr-1"
            :icon="['fa-solid', 'fa-angle-left']"
            width="15px"
          />
        </div>
        <div class="text-white m-arrow-right">
          <font-awesome-icon
            class="mr-1"
            :icon="['fa-solid', 'fa-angle-right']"
            width="15px"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="top-border w-full"><FooterComponent /></div>
  <MissionComponent class="main-header" />
  <div class="w-full video">
    <video :width="width" :height="height" muted :autoplay="true" loop>
      <source src="../assets/videos/bg.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="w-full">
    <UsersComponent :justifyType="'justify-center'">
      <template #navBar>
        <div class="text-center text-white w-full mx-auto text-3xl my-10">
          Meet Our Team
        </div>
      </template>
    </UsersComponent>
  </div>
  <div class="w-full flex flex-wrap main-header py-10">
    <div class="text-center w-full mx-auto text-3xl my-10 text-white">Blog</div>
    <div v-for="item in twoPosts" :key="item.title" class="mx-auto">
      <PostView :item="item" />
    </div>
  </div>
  <div class="w-full">
    <HomeFooter />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterComponent from "../components/FooterComponent.vue";
import MissionComponent from "../components/missionVisionComponent.vue";
import Typed from "typed.js";
import { onMounted } from "vue";
import UsersComponent from "@/components/usersComponent.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import PostView from "../components/PostView.vue";

export default {
  setup() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const options = {
      strings: [
        `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
          nostrum vel blanditiis neque odit suscipit rem totam magnam ratione
          accusamus, praesentium beatae aliquam aut ducimus natus quis. Illum,
          corporis doloribus?`,
      ],
      typeSpeed: 30,
      backSpeed: 30,
      loop: true,
    };

    onMounted(() => {
      new Typed(".text", options);
      window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
      });
    });
    return {
      width,
      height,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    twoPosts() {
      return this.getTwoPosts(this.posts);
    },
  },
  methods: {
    getTwoPosts(posts) {
      let twoPosts = [];
      let counter = 0;
      for (let post in posts) {
        if (counter < 2) {
          twoPosts.push(posts[post]);
          counter++;
        }
      }
      return twoPosts;
    },
  },
  components: {
    NavBar,
    FooterComponent,
    MissionComponent,
    UsersComponent,
    HomeFooter,
    PostView,
  },
};
</script>

<style>
.main-page {
  background-image: url("../assets/images/main-page.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.bottom-border {
  border-bottom: 0.5px solid gray;
}
.top-border {
  border-top: 0.5px solid gray;
}
.main-data {
  margin-top: 10%;
  width: 20%;
  color: white;
}

.main-data-page {
  max-width: 100%;
  overflow-x: hidden;
}

.main-data-page:hover .m-arrow,
.main-data-page:hover .m-arrow-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.4s ease-in-out;
}
.main-data-page:hover .m-arrow {
  left: 0.5%;
}
.main-data-page:hover .m-arrow-right {
  right: 0.5%;
}
.m-arrow,
.m-arrow-right {
  position: absolute;
  top: 50%;
  transition: all 0.4s ease-in-out;
  transform: translateY(-50%);
}

.m-arrow:hover,
.m-arrow-right:hover {
  cursor: pointer;
}
@media (min-width: 768px) {
  .m-arrow {
    left: -2.5%;
  }
  .m-arrow-right {
    right: -2.5%;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .main-data {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .main-data {
    width: 80%;
    color: gray;
  }
  .m-arrow {
    left: 2.5%;
  }
  .m-arrow-right {
    right: 2.5%;
  }
}
@media (min-width: 1199px) {
  .main-data {
    width: 20%;
    color: gray;
  }
}
</style>