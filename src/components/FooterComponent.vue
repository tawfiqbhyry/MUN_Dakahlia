<template>
  <div class="flex w-full justify-between border-b main-header px-4 py-2">
    <div class="w-5/6">
      <div class="items-center justify-between flex contact">
        <div class="mail flex justify-center items-center">
          <font-awesome-icon
            class="mr-1 text-white"
            :icon="['fa-solid', 'fa-envelope']"
            width="35px"
          />
          <p class="text-white ml-2">mun.stem.dk@gmail.com</p>
        </div>
        <div class="phone flex justify-center items-center">
          <font-awesome-icon
            class="mr-1 text-white"
            :icon="['fa-solid', 'fa-phone']"
            width="35px"
          />
          <p class="text-white ml-2">+20 102 698 4193</p>
        </div>
        <div class="flex items-center justify-between text-white">
          <a
            href="https://www.facebook.com/MUNSTEMDK/"
            class="fb"
            target="blanc"
            >facebook</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@media (max-width: 768px) {
  .contact {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .contact .fb:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
  }
}
</style>