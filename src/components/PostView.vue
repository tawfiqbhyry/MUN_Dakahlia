<template>
  <div
    class="
      mx-auto
      my-2
      flex flex-col
      items-center
      justify-center
      text-white
      border
      rounded-lg
    "
    style="width: 400px"
  >
    <img :src="item.img" class="w-full" />
    <div class="w-full mx-auto text-center text-white">{{ item.title }}</div>
    <div class="text-sm w-full flex justify-between px-4 py-2 text-gray-500">
      <div>{{ item.creator }}</div>
      <div>{{ item.createdAt }}</div>
    </div>
    <div class="w-5/6 mx-auto text-white">{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>