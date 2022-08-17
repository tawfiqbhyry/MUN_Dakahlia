<template>
  <div class="w-full h-screen flex flex-col justify-between">
    <NavBar />
    <div id="mail-container" class="h-1/4">
      <div id="line-container">
        <div class="line line-1"></div>
        <div class="line line-4"></div>
        <div class="line line-2"></div>
        <div class="line line-5"></div>
        <div class="line line-3"></div>
      </div>
      <div id="mail"></div>
    </div>
    <div class="text text-white flex flex-col justify-center items-center">
      <p class="my-5 text-2xl">Contact us via our contacts below</p>
      <FooterComponentVue />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import FooterComponentVue from "@/components/FooterComponent.vue";
export default {
  components: {
    NavBar,
    FooterComponentVue,
  },
};
</script>

<style lang="scss">
$primary_color: #070817;

body {
  background: $primary_color;
}

#mail-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mail-move 3s infinite;
}

#line-container {
  position: absolute;
  left: -70px;
  width: 60px;
  overflow: hidden;
  .line {
    margin-top: 5px;
    width: 70px;
    height: 5px;
    background: #fff;
    border-radius: 6px;
  }
}

#mail {
  width: 60px;
  height: 45px;
  border: solid 5px #fff;
  border-radius: 10px;
  overflow: hidden;
  &:before {
    content: "";
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
    border-top: solid 5px #fff;
    border-left: solid 5px #fff;
    transform: rotate(45deg);
    top: 18px;
    left: 12px;
  }
  &:after {
    content: "";
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    border: solid 5px #fff;
    transform: rotate(45deg);
    top: -70px;
    border-radius: 15px;
    background: $primary_color;
  }
}

@for $i from 1 through 3 {
  .line-#{$i} {
    animation: line-#{$i}-move 3s infinite;
  }
  @keyframes line-#{$i}-move {
    0% {
      transform: translateX(-100%);
    }
    20% {
      transform: translateX(100%);
    }
    20.0001% {
      transform: translateX(-100%);
    }
    40% {
      transform: translateX(20% * $i);
    }
    60% {
      transform: translateX(20% * $i);
    }
    80% {
      transform: translateX(-100%);
    }
    80.1% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}

@for $i from 4 through 5 {
  .line-#{$i} {
    animation: line-#{$i}-move 3s infinite;
  }
  @keyframes line-#{$i}-move {
    0% {
      transform: translateX(-80%);
    }
    20% {
      transform: translateX(100%);
    }
    20.0001% {
      transform: translateX(-100%);
    }
    40% {
      transform: translateX(30% * $i);
    }
    60% {
      transform: translateX(30% * $i);
    }
    80% {
      transform: translateX(-80%);
    }
    80.1% {
      transform: translateX(80%);
    }
    100% {
      transform: translateX(-120%);
    }
  }
}

@keyframes mail-move {
  0% {
    opacity: 0;
    left: 3%;
  }
  40% {
    opacity: 1;
    left: 50%;
  }
  60% {
    left: 50%;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: 95%;
  }
}
</style>