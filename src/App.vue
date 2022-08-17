<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>


<script>
export default {};
</script>

<style>
.wrapper {
  width: 100%;
  min-height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}
.slide-enter-to {
  position: absolute;
  right: 0;
}
.slide-enter-from {
  position: absolute;
  right: -100%;
}
.slide-leave-to {
  opacity: 0;
  position: absolute;
  left: -100%;
}
.slide-leave-from {
  opacity: 1;
  position: absolute;
  left: 0;
}
</style>
