<template>
  <div class="teamPage w-full flex flex-col h-screen" :class="justifyType">
    <slot name="navBar"></slot>
    <div
      class="
        flex
        justify-between
        items-center
        mx-auto
        px-4
        py-2
        w-5/6
        border
        rounded-lg
        relative
      "
    >
      <div class="text-white">
        <font-awesome-icon
          class="mr-1 transferIcon transferIcon2"
          :icon="['fa-solid', 'fa-angle-left']"
          width="15px"
          @click="changeUser('-')"
        />
      </div>
      <div class="text-white transferIcon transferIcon1">
        <font-awesome-icon
          class="mr-1 transferIcon"
          :icon="['fa-solid', 'fa-angle-right']"
          width="15px"
          @click="changeUser('+')"
        />
      </div>
      <div
        class="
          mx-auto
          my-7
          px-4
          py-2
          flex
          justify-center
          items-center
          flex-wrap
          w-full
        "
      >
        <img
          :src="team[currentCount].img"
          class="rounded-full w-60 h-60 hover:opacity-60 cursor-pointer"
        />
        <div class="data w-1/2 flex flex-col text-white text-2xl items-center">
          <p>{{ team[currentCount].name }}</p>
          <p>{{ team[currentCount].role }}</p>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    justifyType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      team: [
        {
          name: "Tawfiq Bhyry",
          img: "https://i.im.ge/2022/08/11/F4y5OW.me.jpg",
          role: "president",
        },
        {
          name: "Tawfiq Bhyry2",
          img: "https://i.im.ge/2022/08/11/F4y5OW.me.jpg",
          role: "president",
        },
      ],
      currentCount: 0,
    };
  },
  methods: {
    changeUser(sign) {
      if (sign == "-") {
        if (this.currentCount <= 0) {
          this.currentCount = this.team.length - 1;
        } else {
          this.currentCount -= 1;
        }
      } else if (sign == "+") {
        if (this.currentCount >= this.team.length - 1) {
          this.currentCount = 0;
        } else {
          this.currentCount += 1;
        }
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=DynaPuff&display=swap");
.data {
  font-family: "DynaPuff", cursive;
}
.transferIcon:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: all 0.3s;
}
.transferIcon1 {
  position: absolute;
  top: 50%;
  right: 30px;
}
.transferIcon2 {
  position: absolute;
  top: 50%;
  left: 30px;
}
</style>