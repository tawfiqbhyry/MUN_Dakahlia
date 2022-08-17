<template>
  <div class="w-full main-header about-section flex justify-between flex-col">
    <NavBar class="my-10" />
    <missionVisionComponent />
    <div class="top-border w-full"><FooterComponent /></div>
  </div>
</template>

<script>
import missionVisionComponent from "../components/missionVisionComponent.vue";
import NavBar from "../components/NavBar.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  components: {
    missionVisionComponent,
    NavBar,
    FooterComponent,
  },
  
};
</script>

<style>
.about-section {
  height: 100vh;
}
@media (max-height: 968px) {
  .main-header {
    height: fit-content;
  }
}
</style>