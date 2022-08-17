<template>
  <div
    class="w-full main-header"
    style="min-height: fit-content; height: 100vh"
  >
    <div class="flex h-full flex-col justify-between w-full">
      <div class="w-full">
        <NavBar />
      </div>
      <div class="w-full flex flex-wrap main-header py-10">
        <div class="text-center w-full mx-auto text-3xl my-10 text-white">
          Blog
        </div>
        <div v-for="item in posts" :key="item.title" class="mx-auto">
          <PostView :item="item" />
        </div>
      </div>
      <div class="w-full">
        <HomeFooter />
      </div>
    </div>
  </div>
</template>

<script>
import PostView from "../components/PostView.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    PostView,
    HomeFooter,
    NavBar,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
};
</script>

<style>
</style>