<template>
  <div class="w-5/6 mx-auto justify-center items-center flex flex-col">
    <div class="flex justify-between w-1/2 m-auto px-4 py-2 items-center">
      <img :src="userData.photo_link" class="w-10 h-10 rounded-full" />
      <div class="text-white">
        {{ userData ? `${userData.name}` : "no user" }}
      </div>
    </div>
    <div
      v-for="item in Object.keys(userData)"
      :key="item.email"
      class="w-full m-auto"
    >
      <div
        class="flex flex-col text-white border rounded-lg my-2"
        v-if="item !== 'email' && item !== 'role' && item !== 'teamCommittee'"
      >
        <div class="data flex item-center justify-between px-4 py-2">
          <p>{{ item }}:</p>
          <p v-if="item !== 'photo_link'">{{ userData[item] }}</p>
          <img v-else :src="userData.photo_link" class="w-7 h-7 rounded-full" />
        </div>
        <div
          class="
            flex
            justify-between
            items-center
            px-4
            py-2
            text-gray-500
            flex-wrap
          "
        >
          <TextField
            v-model="fields[item].data"
            :fieldType="fields[item].type"
            :fieldName="fields[item].FieldName"
            class="mx-auto w-full"
          />
          <div
            class="
              px-3
              py-2
              text-white
              bg-blue-400
              hover:bg-blue-800
              rounded-lg
              mt-2
              hover:cursor-pointer
            "
            @click="editUserData(uid, userData, item, fields[item].data)"
          >
            <font-awesome-icon
              class="mr-1"
              :icon="['fas', 'fa-edit']"
              width="15px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { update, ref } from "@firebase/database";
import TextField from "./inputField.vue";
import { db } from "../assets/utilities/firebase";
export default {
  data() {
    return {
      fields: {
        contactAddress: {
          data: "",
          type: "text",
          FieldName: "contact address",
        },
        contactMail: {
          data: "",
          type: "email",
          FieldName: "contact mail",
        },
        contactPhone: {
          data: "",
          type: "text",
          FieldName: "contact phone",
        },
        name: {
          data: "",
          type: "text",
          FieldName: "name",
        },
        photo_link: {
          data: "",
          type: "text",
          FieldName: "photo link",
        },
      },
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
  },
  components: {
    TextField,
  },
  methods: {
    editUserData(uid, user, field, value) {
      const changes = user;
      changes[field] = value;
      const updates = {};
      updates["users/" + uid] = changes;
      update(ref(db), updates).then(() => {
        alert("user edited");
      });
    },
  },
};
</script>

<style>
</style>