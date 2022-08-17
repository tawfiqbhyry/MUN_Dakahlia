<template>
  <div
    v-if="roleCheck"
    class="
      profile
      hover:cursor-pointer
      flex
      justify-center
      items-center
      text-center text-white
      border-b
      mb-5
    "
  >
    <div class="text-white w-full">
      <div class="profile px-4 py-2"><slot name="text"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
    roleCheck: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
</style>