<template>
  <div
    class="text-white w-5/6 mx-auto flex flex-col items-center justify-center"
  >
    <h1 class="w-full text-2xl text-center py-2 px-4">Add post</h1>
    <div class="px-x py-2 mx-auto">
      <form
        @submit.prevent="sendData"
        class="flex flex-col mx-auto justify-center items-center"
      >
        <TextField
          class="text-gray-500"
          v-model="title"
          :fieldType="'text'"
          :fieldName="'post title'"
        />
        <TextField
          class="text-gray-500"
          v-model="description"
          :fieldType="'text'"
          :fieldName="'post description'"
        />
        <TextField
          class="text-gray-500"
          v-model="img"
          :fieldType="'text'"
          :fieldName="'post image'"
        />
        <button
          class="
            submit
            w-full
            bg-blue-400
            rounded-lg
            text-white
            px-4
            py-2
            hover:bg-blue-800 hover:cursor-pointer
            my-3
          "
        >
          Add post
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { db } from "@/assets/utilities/firebase";
import { set, ref } from "@firebase/database";
import TextField from "./inputField.vue";
export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      description: "",
      img: "",
    };
  },
  components: {
    TextField,
  },
  methods: {
    sendData() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      const post = {
        title: this.title,
        description: this.description,
        img: this.img,
        creator: this.userData.email,
        createdAt: today,
      };
      if (this.userData.role == "head") {
        this.requestPost(
          "postsRequests/admin",
          post,
          "request sent to admins successfully",
          "admin"
        );
      } else if (this.userData.role == "member") {
        this.requestPost(
          "postsRequests/head",
          post,
          "request sent to head successfully",
          "head"
        );
      } else if (this.userData.role == "admin") {
        this.addPost(post);
      }
    },
    requestPost(location, post, message, requestedTo) {
      set(ref(db, `${location}/` + post.title), {
        title: post.title,
        description: post.description,
        img: post.img,
        creator: post.creator,
        createdAt: post.createdAt,
        requestTo: requestedTo,
        requestFrom: this.userData.email,
        status: "pending",
      }).then(() => {
        alert(`${message}`);
      });
    },
    addPost(post) {
      set(ref(db, "posts/" + post.title), {
        title: post.title,
        description: post.description,
        img: post.img,
        creator: post.creator,
        createdAt: post.createdAt,
      }).then(() => {
        alert("post added");
      });
    },
  },
};
</script>

<style>
</style>