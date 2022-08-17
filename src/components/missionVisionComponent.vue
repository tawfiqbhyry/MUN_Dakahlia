<template>
  <div class="w-full mx-auto py-2 px-2">
    <div
      class="flex flex-col item-center justify-center mx-auto w-5/6 text-white"
    >
      <img
        src="../assets/images/mission-vision.jpg"
        class="
          w-full
          my-10
          rounded-lg
          hover:cursor-pointer hover:opacity-75
          transition-all
          duration-500
          ease-in-out
        "
      />
      <div class="data w-full flex justify-between flex-wrap mx-auto">
        <div
          class="
            my-10
            px-4
            py-2
            border
            rounded-lg
            flex
            items-center
            justify-between
            mx-auto
            flex-col
          "
          style="width: 500px; height:400px"
        >
          <div
            class="
              text-2xl text-center
              flex
              justify-center
              mx-auto
              text-gray-500
            "
          >
            <font-awesome-icon
              class="mr-1"
              :icon="['fa-solid', 'fa-bullseye']"
              width="20px"
            />
            <p>MISSION</p>
          </div>
          <div class="text-xl text-left mission"></div>
        </div>
        <div
          class="
            my-10
            px-4
            py-2
            border
            rounded-lg
            flex
            items-center
            justify-between
            mx-auto
            flex-col
          "
          style="width: 500px; height:400px"
        >
          <div
            class="
              text-2xl text-center
              flex
              justify-center
              mx-auto
              text-gray-500
            "
          >
            <font-awesome-icon
              class="mr-1"
              :icon="['fa-solid', 'fa-eye']"
              width="20px"
            />
            <p>VISION</p>
          </div>
          <div class="text-xl text-left vision"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Typed from "typed.js";
export default {
  setup() {
    onMounted(() => {
      typeData(
        ".mission",
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. A tempore
            suscipit quo accusantium. Fugiat libero incidunt quaerat officia
            omnis consequuntur, aliquam quam, hic sit ipsa autem debitis
            pariatur qui dolores.`
      );
      typeData(
        ".vision",
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            dolorum excepturi dolores doloribus, consequuntur culpa dignissimos
            cupiditate vitae voluptate architecto incidunt unde non animi
            tempora perspiciatis quae dolor ut? Labore.`
      );
    });

    function typeData(selector, text) {
      const options = {
        strings: [text],
        typeSpeed: 30,
        backSpeed: 30,
        loop: true,
      };
      new Typed(selector, options);
    }
  },
};
</script>

<style>
.mission:after,
.vision:after {
  visibility: visible;
  content: "";
  background-color: #d4f8e3;
  display: inline-block;
  position: relative;
  width: 0.05em;
  height: 1em;
  top: 5px;
  left: 5px;
  margin-left: 0;
  -moz-box-shadow: -2px 0 0px rgba(0, 0, 225, 0.4),
    -1px 0 3px rgba(103, 171, 236, 0.6), 1px 0 4px rgba(69, 112, 204, 0.5);
  -webkit-box-shadow: -2px 0 0px rgba(0, 0, 225, 0.4),
    -1px 0 3px rgba(103, 171, 236, 0.6), 1px 0 4px rgba(69, 112, 204, 0.5);
  box-shadow: -2px 0 0px rgba(0, 0, 225, 0.4),
    -1px 0 3px rgba(103, 171, 236, 0.6), 1px 0 4px rgba(69, 112, 204, 0.5);
  -moz-animation: flicker 0.1s steps(2, start) infinite,
    ready 1s steps(2, start) 25s infinite;
  -webkit-animation: flicker 0.1s steps(2, start) infinite,
    ready 1s steps(2, start) 25s infinite;
  animation: flicker 0.1s steps(2, start) infinite,
    ready 1s steps(2, start) 25s infinite;
}
</style>