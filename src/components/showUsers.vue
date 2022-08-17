<template>
  <div
    class="
      w-5/6
      my-4
      mx-auto
      px-4
      py-2
      flex
      justify-between
      items-center
      text-white
      main-header
    "
    v-for="user in users"
    :key="user.email"
  >
    <div class="w-1/6">
      <img
        :src="user.photo_link"
        :alt="user.name"
        class="w-6 h-6 rounded-full"
      />
    </div>
    <div class="w-5/6 flex justify-between items-center">
      <p class="w-2/3">{{ user.name ? `${user.name}` : "no user" }}</p>
      <div
        v-if="userData.email == user.email"
        class="w-1/2 justify-end flex items-center"
      >
        <div
          class="
            px-3
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
        </div>
      </div>
      <div class="w-full flex justify-end items-center" v-else>
        <div
          class="
            px-3
            py-2
            bg-red-600
            hover:bg-red-400
            rounded-lg
            hover:cursor-pointer
            mr-2
          "
          @click="deleteUser(user)"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fas', 'fa-trash']"
            width="15px"
          />
        </div>
        <div
          class="
            px-3
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
        </div>
        <teleport to="body">
          <ReusableComponentVue v-if="shown" @close="shown = false">
            <template #body>
              <div
                v-for="item in fields"
                :key="item.fieldName"
                class="flex justify-between items-center"
              >
                <div class="w-5/6">
                  <TextField
                    v-model="item[item.fieldName]"
                    :fieldType="item.type"
                    :fieldName="item.fieldName"
                    class="w-5/6"
                  />
                </div>
                <div
                  class="
                    px-3
                    py-2
                    bg-blue-400
                    hover:bg-blue-800
                    flex
                    justify-center
                    items-center
                    rounded-lg
                    hover:cursor-pointer
                  "
                  @click="
                    editUser(currentUser, item.fieldName, item[item.fieldName])
                  "
                >
                  <font-awesome-icon
                    class="mr-1"
                    :icon="['fas', 'fa-edit']"
                    width="15px"
                  />
                </div>
              </div>
              <div
                class="
                  w-1/2
                  bg-blue-700
                  hover:bg-blue-400
                  rounded-lg
                  hover:cursor-pointer
                  mx-auto
                  mt-4
                  mb-2
                  px-4
                  py-2
                  flex
                  justify-center
                  items-center
                  text-white
                "
                @click="shown = false"
              >
                Close
              </div>
            </template>
          </ReusableComponentVue></teleport
        >
      </div>
    </div>
  </div>
</template>

<script>
import { remove, ref, set, update } from "firebase/database";
import { db } from "../assets/utilities/firebase";
import ReusableComponentVue from "./ReusableComponent.vue";
import TextField from "./inputField.vue";
export default {
  data() {
    return {
      currentUser: {},
      fields: [
        { email: "", type: "email", fieldName: "email" },
        { name: "", type: "text", fieldName: "name" },
        { role: "", type: "text", fieldName: "role" },
        { photo_link: "", type: "text", fieldName: "photo_link" },
        { contactMail: "", type: "email", fieldName: "contactMail" },
        { contactPhone: "", type: "text", fieldName: "contactPhone" },
        { contactAddress: "", type: "text", fieldName: "contactAddress" },
        { teamCommittee: "", type: "text", fieldName: "teamCommittee" },
      ],
      shown: false,
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
  },
  components: {
    ReusableComponentVue,
    TextField,
  },
  methods: {
    deleteUser(user) {
      const uid = Object.keys(this.users).find(
        (key) => this.users[key] === user
      );
      if (uid) {
        if (this.userData.role == "admin") {
          this.removeUser(uid);
        } else if (this.userData.role == "head") {
          this.requestChange(user, uid, "usersDelete", "remove");
        }
      } else {
        this.shown = false;
      }
    },
    editUser(user, field, value) {
      const uid = Object.keys(this.users).find(
        (key) => this.users[key] === user
      );
      if (this.userData.role == "admin") {
        this.editUserData(uid, user, field, value);
        this.clearFields();
      } else if (this.userData.role == "head") {
        const changes = {
          email: user.email,
          name: user.name,
          role: user.role,
          photo_link: user.photo_link,
          contactMail: user.contactMail,
          contactPhone: user.contactPhone,
          contactAddress: user.contactAddress,
          teamCommittee: user.teamCommittee,
        };
        changes[field] = value;
        this.requestChange(changes, uid, "usersEdit", "edit");
        this.clearFields();
      }
    },
    removeUser(uid) {
      remove(ref(db, "users/" + uid)).then(() => {
        alert("user removed");
      });
    },
    editUserData(uid, user, field, value) {
      const changes = user;
      changes[field] = value;
      const updates = {};
      updates["users/" + uid] = changes;
      update(ref(db), updates).then(() => {
        alert("user edited");
      });
    },
    requestChange(user, uid, Ref, value) {
      set(ref(db, `${Ref}/` + uid), {
        email: user.email,
        name: user.name,
        role: user.role,
        photo_link: user.photo_link,
        contactMail: user.contactMail,
        contactPhone: user.contactPhone,
        contactAddress: user.contactAddress,
        teamCommittee: user.teamCommittee,
        requestTo: "admin",
        requestFrom: this.userData.email,
        status: "pending",
      }).then(() => {
        alert(`${value} request sent`);
      });
    },
    clearFields() {
      for (let i = 0; i < this.fields.length; i++) {
        this.fields[i].email = "";
        this.fields[i].password = "";
        this.fields[i].name = "";
        this.fields[i].role = "";
        this.fields[i].photo_link = "";
        this.fields[i].contactMail = "";
        this.fields[i].contactPhone = "";
        this.fields[i].contactAddress = "";
        this.fields[i].teamCommittee = "";
      }
      this.shown = false;
    },
    openModal(user) {
      this.currentUser = user;
      this.shown = true;
    },
  },
};
</script>

<style>
</style>