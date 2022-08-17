<template>
  <teleport to="body">
    <ReusableComponentVue @close="showPost = false" v-if="showPost">
      <template #body>
        <div
          class="
            flex
            justify-between
            items-center
            mx-auto
            px-4
            py-2
            text-white
            w-full
          "
          v-for="item in Object.keys(currentPost)"
          :key="currentPost[item]"
        >
          <div class="w-1/2">
            <p class="w-full">{{ item }}</p>
          </div>
          <p class="1/2 flex overflow-x-hidden text-end">
            {{ currentPost[item] }}
          </p>
        </div>
      </template>
    </ReusableComponentVue>
  </teleport>
  <div class="w-full flex flex-col mx-auto">
    <div
      class="w-full flex flex-col px-4 py-2"
      v-if="userData.role == 'admin' || userData.role == 'head'"
    >
      <div class="w-full" v-for="item in Object.keys(requests)" :key="item">
        <h1
          class="w-fit my-2 mx-4 border-b text-2xl text-white"
          v-if="requests[item]"
        >
          {{ item }}
        </h1>
        <div class="w-full" v-for="user in requests[item]" :key="user">
          <div
            class="w-full flex justify-between px-4 py-2 text-white"
            v-if="
              userData.role == 'admin' || user.requestFrom == userData.email
            "
          >
            <div
              class="
                data
                w-full
                items-center
                flex
                justify-between
                px-4
                py-2
                text-white
              "
            >
              <p class="w-1/3">{{ user.name }}</p>
              <p :class="getStatus(user.status)" class="w-1/3">
                status: {{ user.status }}
              </p>
              <div class="showButton">
                <button
                  class="
                    px-4
                    py-2
                    bg-blue-400
                    hover:bg-blue-800
                    rounded-lg
                    hover:cursor-pointer
                  "
                  @click="openModal(user)"
                >
                  <font-awesome-icon
                    class="mr-1"
                    :icon="['fas', 'fa-edit']"
                    width="15px"
                  />
                </button>
              </div>
              <div class="admin" v-if="userData.role == 'admin'">
                <div class="accepted">
                  <button
                    @click="
                      acceptRequest(
                        getKeyByValue(requests[item], user),
                        item,
                        user
                      )
                    "
                    class="w-full flex justify-center items-center"
                  >
                    <div class="w-full flex justify-center items-center">
                      <div class="w-full flex justify-center items-center">
                        <img
                          class="w-10 h-10 rounded-full hover:opacity-50"
                          src="https://img.icons8.com/color/48/000000/checkmark.png"
                          alt="checkmark"
                        />
                      </div>
                    </div>
                  </button>
                </div>
                <div class="rejected">
                  <button
                    @click="
                      changeRequest(
                        getKeyByValue(requests[item], user),
                        item,
                        user,
                        'rejected'
                      )
                    "
                    v-if="user.status !== 'accepted'"
                    class="w-full flex justify-center items-center"
                  >
                    <div class="w-full flex justify-center items-center">
                      <div class="w-full flex justify-center items-center">
                        <img
                          class="w-10 h-10 rounded-full hover:opacity-50"
                          src="https://img.icons8.com/color/48/000000/delete-sign.png"
                          alt="delete-sign"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div class="head" v-if="userData.role == 'head'">
                <div class="cancel">
                  <button
                    @click="
                      cancelRequest(getKeyByValue(requests[item], user), item)
                    "
                    class="w-full flex justify-center items-center"
                  >
                    <div class="w-full flex justify-center items-center">
                      <div class="w-full flex justify-center items-center">
                        <img
                          class="w-10 h-10 rounded-full hover:bg-red-300"
                          src="https://img.icons8.com/color/48/000000/cancel.png"
                          alt="cancel"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col px-4 py-2">
      <div
        class="w-full"
        v-if="userData.role == 'head' || userData.role == 'member'"
      >
        <div class="w-full" v-if="hasRequests">
          <div
            class="w-full"
            v-for="item in Object.keys(headPosts)"
            :key="item"
          >
            <div
              class="
                w-5/6
                flex
                justify-between
                px-4
                py-2
                text-white
                flex-wrap
                mx-auto
              "
              v-if="
                userData.email == headPosts[item].creator ||
                userData.role == 'head'
              "
            >
              <div class="text-white px-4 py-2">{{ item }}</div>
              <div
                class="text-white px-4 py-2"
                :class="getStatus(headPosts[item].status)"
              >
                {{ headPosts[item].status }}
              </div>
              <div class="edit">
                <button
                  @click="openPostModal(headPosts[item])"
                  class="w-full flex justify-center items-center"
                >
                  <div class="w-full flex justify-center items-center">
                    <div class="w-full flex justify-center items-center">
                      <img
                        class="w-8 h-8 rounded-full hover:opacity-50"
                        src="https://img.icons8.com/color/48/000000/edit.png"
                        alt="edit"
                      />
                    </div>
                  </div>
                </button>
              </div>
              <teleport to="body">
                <ReusableComponentVue @close="showPost = false" v-if="showPost">
                  <template #body>
                    <div
                      class="
                        flex
                        justify-between
                        items-center
                        mx-auto
                        px-4
                        py-2
                        text-white
                        w-full
                      "
                      v-for="item in Object.keys(currentPost)"
                      :key="currentPost[item]"
                    >
                      <div class="w-1/2">
                        <p class="w-full">{{ item }}</p>
                      </div>
                      <p class="1/2 flex overflow-x-hidden text-end">
                        {{ currentPost[item] }}
                      </p>
                    </div>
                  </template>
                </ReusableComponentVue>
              </teleport>
              <div class="handleRequest">
                <div class="cancel" v-if="userData.role == 'member'">
                  <button
                    @click="removeRequest(item, 'postsRequests/head')"
                    class="w-full flex justify-center items-center"
                  >
                    <div class="w-full flex justify-center items-center">
                      <div class="w-full flex justify-center items-center">
                        <img
                          class="w-8 h-8 rounded-full hover:bg-red-300"
                          src="https://img.icons8.com/color/48/000000/cancel.png"
                          alt="cancel"
                        />
                      </div>
                    </div>
                  </button>
                </div>
                <div class="changeRequest" v-else>
                  <div class="accept">
                    <button
                      @click="
                        handleAccept(
                          item,
                          'postsRequests/head',
                          headPosts[item],
                          'accepted',
                          'post request was accepted'
                        )
                      "
                      class="w-full flex justify-center items-center"
                    >
                      <div class="w-full flex justify-center items-center">
                        <div class="w-full flex justify-center items-center">
                          <img
                            class="w-8 h-8 rounded-full hover:opacity-50"
                            src="https://img.icons8.com/color/48/000000/checkmark.png"
                            alt="checkmark"
                          />
                        </div>
                      </div>
                    </button>
                    <div
                      class="reject"
                      v-if="headPosts[item].status !== 'accepted'"
                    >
                      <button
                        @click="
                          changeRequest(
                            item,
                            'postsRequests/head',
                            headPosts[item],
                            'rejected',
                            'post request was rejected'
                          )
                        "
                        class="w-full flex justify-center items-center"
                      >
                        <div class="w-full flex justify-center items-center">
                          <div class="w-full flex justify-center items-center">
                            <img
                              class="w-8 h-8 rounded-full hover:bg-red-300"
                              src="https://img.icons8.com/color/48/000000/delete-sign.png"
                              alt="delete-sign"
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                w-5/6
                flex
                justify-between
                px-4
                py-2
                text-white
                flex-wrap
                mx-auto
                text-center
              "
              v-else-if="hasRequests == false"
            >
              No requests
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full" v-if="adminHasRequests">
      <div
        class="
          w-5/6
          px-4
          py-2
          mx-auto
          flex
          justify-between
          items-center
          flex-wrap
        "
        v-for="item in Object.keys(adminPosts)"
        :key="item"
      >
        <p class="px-4 py-2 text-center text-white">{{ item }}</p>
        <div class="px-4 py-2 text-center text-white">
          <p :class="getStatus(adminPosts[item].status)">
            {{ adminPosts[item].status }}
          </p>
        </div>
        <div class="edit">
          <button
            @click="openPostModal(adminPosts[item])"
            class="w-full flex justify-center items-center"
          >
            <div class="w-full flex justify-center items-center">
              <div class="w-full flex justify-center items-center">
                <img
                  class="w-8 h-8 rounded-full hover:opacity-50"
                  src="https://img.icons8.com/color/48/000000/edit.png"
                  alt="edit"
                />
              </div>
            </div>
          </button>
        </div>
        <div class="handleRequest">
          <div class="cancel" v-if="userData.role == 'head'">
            <button
              @click="removeRequest(item, 'postsRequests/admin')"
              class="w-full flex justify-center items-center"
            >
              <div class="w-full flex justify-center items-center">
                <div class="w-full flex justify-center items-center">
                  <img
                    class="w-8 h-8 rounded-full hover:bg-red-300"
                    src="https://img.icons8.com/color/48/000000/cancel.png"
                    alt="cancel"
                  />
                </div>
              </div>
            </button>
          </div>

          <div class="changeRequest" v-else>
            <div class="accept">
              <button
                @click="
                  handleAcceptPost(
                    item,
                    'postsRequests/admin',
                    adminPosts[item],
                    'accepted',
                    'post request was accepted'
                  )
                "
                class="w-full flex justify-center items-center"
              >
                <div class="w-full flex justify-center items-center">
                  <div class="w-full flex justify-center items-center">
                    <img
                      class="w-8 h-8 rounded-full hover:opacity-50"
                      src="https://img.icons8.com/color/48/000000/checkmark.png"
                      alt="checkmark"
                    />
                  </div>
                </div>
              </button>
            </div>
            <div class="reject" v-if="adminPosts[item].status !== 'accepted'">
              <button
                @click="
                  changeRequest(
                    item,
                    'postsRequests/admin',
                    adminPosts[item],
                    'rejected',
                    'post request was rejected'
                  )
                "
                class="w-full flex justify-center items-center"
              >
                <div class="w-full flex justify-center items-center">
                  <div class="w-full flex justify-center items-center">
                    <img
                      class="w-8 h-8 rounded-full hover:bg-red-300"
                      src="https://img.icons8.com/color/48/000000/delete-sign.png"
                      alt="delete-sign"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-white text-center mx-auto w-full" v-else>No requests to admin</div>
  </div>
</template>

<script>
import { remove, ref, update, set } from "@firebase/database";
import { db, secondDB, secondAuth } from "../assets/utilities/firebase";
import ReusableComponentVue from "./ReusableComponent.vue";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export default {
  data() {
    return {
      showModal: false,
      currentUser: {},
      showPost: false,
      currentPost: {},
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    requests: {
      type: Object,
      required: true,
    },
    headPosts: {
      type: Object,
      required: true,
    },
    adminPosts: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasRequests() {
      if (this.getCount() > 0) {
        return true;
      } else {
        return false;
      }
    },
    adminHasRequests() {
      if (this.getAdminPostsCount() > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    },
    cancelRequest(uid, place) {
      this.removeRequest(uid, place);
    },
    removeRequest(uid, location, message = "request canceled") {
      remove(ref(db, `${location}/` + uid)).then(() => {
        alert(message);
      });
    },
    getStatus(status) {
      if (status == "accepted") {
        return "text-green-500";
      } else if (status == "rejected") {
        return "text-red-500";
      } else {
        return "text-yellow-500";
      }
    },
    changeRequest(uid, location, user, status, message = "request changed") {
      const changes = user;
      changes["status"] = status;
      const updates = {};
      updates[`${location}/` + uid] = changes;
      update(ref(db), updates).then(() => {
        alert(message);
      });
    },
    handleAccept(uid, location, user, status, message = "request accepted") {
      this.writePostToAdmin(uid, user);
      this.changeRequest(uid, location, user, status, message);
    },
    handleAcceptPost(
      uid,
      location,
      user,
      status,
      message = "request accepted"
    ) {
      this.writePostProduction(uid, user);
      this.changeRequest(uid, location, user, status, message);
    },
    getCount() {
      let counter = 0;
      for (let item in this.headPosts) {
        if (
          this.userData.email == this.headPosts[item].creator ||
          this.userData.role == "head"
        ) {
          counter++;
        }
      }
      return counter;
    },
    getAdminPostsCount() {
      let counter = 0;
      for (let item in this.adminPosts) {
        if (
          this.userData.email == this.adminPosts[item].requestFrom ||
          this.userData.role == "admin"
        ) {
          counter++;
        }
      }
      return counter;
    },
    openModal(user) {
      this.currentUser = user;
      this.showModal = true;
    },
    openPostModal(post) {
      this.currentPost = post;
      this.showPost = true;
    },
    editUserData(uid, user) {
      const changes = {
        contactAddress: user.contactAddress,
        contactMail: user.contactMail,
        contactPhone: user.contactPhone,
        email: user.email,
        name: user.name,
        photo_link: user.photo_link,
        role: user.role,
        teamCommittee: user.teamCommittee,
      };
      const updates = {};
      updates["users/" + uid] = changes;
      update(ref(db), updates).then(() => {
        alert("user edited");
      });
    },
    acceptRequest(uid, location, user) {
      if (location == "usersEdit") {
        this.editUserData(uid, user);
      } else if (location == "usersDelete") {
        this.removeRequest(uid, "users/", "user deleted");
      } else if (location == "usersRequests") {
        this.createUser(user);
      }
      this.changeRequest(uid, location, user, "accepted");
    },
    writeUserData(userId, user) {
      set(ref(secondDB, "users/" + userId), {
        email: user.email,
        name: user.name,
        role: user.role,
        photo_link: user.photo_link,
        contactMail: user.contactMail,
        contactPhone: user.contactPhone,
        contactAddress: user.contactAddress,
        teamCommittee: user.teamCommittee,
      }).then(() => {
        alert("successfully written data");
      });
    },
    writePostToAdmin(postId, post) {
      set(ref(secondDB, "postsRequests/admin/" + postId), {
        createdAt: post.createdAt,
        creator: post.creator,
        description: post.description,
        title: post.title,
        img: post.img,
        requestFrom: this.userData.email,
        status: "pending",
        requestTo: "admin",
      }).then(() => {
        alert("successfully written data");
      });
    },
    writePostProduction(postId, post) {
      set(ref(secondDB, "posts/" + postId), {
        createdAt: post.createdAt,
        creator: post.creator,
        description: post.description,
        title: post.title,
        img: post.img,
      }).then(() => {
        alert("successfully written data");
      });
    },
    createUser(user) {
      createUserWithEmailAndPassword(secondAuth, user.email, user.password)
        .then((userCredential) => {
          const userCred = userCredential.user;
          const uid = userCred.uid;
          try {
            this.writeUserData(uid, user);
            alert("successfully, data was written.");
          } catch (error) {
            alert(error.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  components: {
    ReusableComponentVue,
  },
};
</script>

<style>
</style>