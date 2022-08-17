<template>
  <usersComponentVue :justifyType="'justify-between'">
    <template #navBar>
      <NavBar />
    </template>
    <template #footer><FooterComponent /> </template>
  </usersComponentVue>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import usersComponentVue from "@/components/usersComponent.vue";

export default {
  components: {
    FooterComponent,
    usersComponentVue,
    NavBar,
  },
};
</script>

<style>
</style>