<template>
  <div class="w-full justify-center items-center flex flex-col main-header">
    <h1
      class="w-full m-auto flex justify-center items-center text-white text-3xl"
    >
      Add user
    </h1>
    <form @submit.prevent="addUser(userData.role)" class="flex w-full flex-col">
      <div v-for="item in fields" :key="item.fieldName">
        <TextField
          v-model="item[item.fieldName]"
          :fieldType="item.type"
          :fieldName="item.fieldName"
        />
      </div>
      <div class="w-full flex items-center justify-center m-auto">
        <div
          class="flex justify-center items-center w-full my-4"
          style="width: 343px"
          @click="addUser(userData.role)"
        >
          <button class="px-4 py-2 text-white rounded-lg main-header w-full">
            Add user
          </button>
        </div>
      </div>
      <div
        class="error w-full mx-auto text-white flex justify-center items-center"
        v-if="errorField"
      >
        {{ errorText }}
      </div>
    </form>
  </div>
</template>

<script>
import { secondAuth, secondDB } from "../assets/utilities/firebase";
import { set, ref } from "firebase/database";
import TextField from "./inputField.vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      fields: [
        { email: "", type: "email", fieldName: "email" },
        { password: "", type: "password", fieldName: "password" },
        { name: "", type: "text", fieldName: "name" },
        { role: "", type: "text", fieldName: "role" },
        { photo_link: "", type: "text", fieldName: "photo_link" },
        { contactMail: "", type: "email", fieldName: "contactMail" },
        { contactPhone: "", type: "text", fieldName: "contactPhone" },
        { contactAddress: "", type: "text", fieldName: "contactAddress" },
        { teamCommittee: "", type: "text", fieldName: "teamCommittee" },
      ],
      errorField: false,
      errorText: "",
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
    addUser(role) {
      if (role == "admin") {
        this.createUser(this.fields);
      } else if (role == "head") {
        this.requestAdd(this.fields);
      }
    },
    createUser(fields) {
      createUserWithEmailAndPassword(
        secondAuth,
        fields[0].email,
        fields[1].password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;
          try {
            this.writeUserData(uid, fields);
            this.errorField = true;
            this.errorText = "successfully written data";
          } catch (error) {
            this.errorField = true;
            this.errorText = error.message;
          }
        })
        .catch((error) => {
          this.errorField = true;
          this.errorText = error.message;
        });
    },
    writeUserData(userId, fields) {
      set(ref(secondDB, "users/" + userId), {
        email: fields[0].email,
        name: fields[2].name,
        role: fields[3].role,
        photo_link: fields[4].photo_link,
        contactMail: fields[5].contactMail,
        contactPhone: fields[6].contactPhone,
        contactAddress: fields[7].contactAddress,
        teamCommittee: fields[8].teamCommittee,
      }).then(() => {
        this.errorField = true;
        this.errorText = "successfully written data";
        alert("successfully written data");
      });
    },
    requestAdd(fields) {
      set(ref(secondDB, "usersRequests/" + this.uid), {
        email: fields[0].email,
        password: fields[1].password,
        name: fields[2].name,
        role: fields[3].role,
        photo_link: fields[4].photo_link,
        contactMail: fields[5].contactMail,
        contactPhone: fields[6].contactPhone,
        contactAddress: fields[7].contactAddress,
        teamCommittee: fields[8].teamCommittee,
        requestedFrom:this.userData.email,
        requestTo: "admin",
        status: "pending",
      }).then(() => {
        this.errorField = true;
        this.errorText = "successfully requested add";
        alert("successfully requested add");
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
      });
    },
  },
};
</script>

<style>
</style>