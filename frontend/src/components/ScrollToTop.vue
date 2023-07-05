<template>
  <div class="scroll-to-top" @click="scrollToTop()">
    <v-icon icon="mdi-arrow-up" class="up-icon"></v-icon>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    function scrollToTop() {
      console.log("Scroll");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    return { scrollToTop };
  },
});
</script>
<style>
.scroll-to-top {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #67e9ae;
  transition: transform 0.2s;
}
.scroll-to-top:hover {
  transform: scale(1.2);
}
.up-icon {
  width: 100%;
  height: 100%;
  font-size: 3rem;
  color: white;
}
</style>
