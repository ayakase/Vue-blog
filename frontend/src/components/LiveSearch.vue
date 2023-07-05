<template>
  <div class="floating-box">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-text-field
            v-model="livesearch"
            label="Search"
            required
            @submit.prevent
          ></v-text-field>
        </v-row>
      </v-container>
    </v-form>
    <div class="result-container">
      <div>hellp</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import api from "../api";

export default defineComponent({
  setup() {
    let livesearch = ref();
    let timer = null;

    onMounted(() => {});
    watch(livesearch, (newvalue) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        console.log(newvalue);
        livesearch.value = newvalue;
        api
          .get("livesearch/" + newvalue)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 2000);
      onUnmounted(() => {
        clearTimeout(timer);
      });
    });
    return { livesearch };
  },
});
</script>
<style scoped>
.floating-box {
  padding: 0.5rem;
  border-radius: 1rem;
  position: fixed;
  width: 500px;
  height: 500px;
  right: 30%;
  bottom: 4rem;
  background-color: #eeeeee;
  z-index: 99;
  overflow: hidden;
}
.result-container {
  overflow: scroll;
  height: 450px;
}
</style>
