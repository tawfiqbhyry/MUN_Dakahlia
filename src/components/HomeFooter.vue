<template>
  <div class="w-full flex flex-col main-header">
    <FooterComponent />
    <p class="px-4 py-2 text-sm text-white mx-auto">Copyright © MUNDK. All Rights Reserved.</p>
  </div>
</template>

<script>
import FooterComponent from "./FooterComponent.vue";
export default {
  components: {
    FooterComponent,
  },
};
</script>

<style>
</style>