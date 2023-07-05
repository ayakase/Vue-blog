<template>
  <PostComponent :postArray="postArray"></PostComponent>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import api from "../api";
// import router from "../router";
import { useRoute } from "vue-router";
import PostComponent from "@/components/PostComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: { PostComponent },
  setup() {
    const route = useRoute();
    let currentPage = ref(0);
    let page = 1;
    const pageSize = 8;
    let tag = route.query.tag;
    let postArray = ref();

    function previousPage() {
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    }

    function nextPage() {
      if (currentPage.value < Math.floor(postArray.value.length / pageSize)) {
        currentPage.value++;
      }
    }
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    onMounted(() => {
      document.title = `${tag}`;
      api
        .get("/tags/" + tag)
        .then((response) => {
          postArray.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return {
      postArray,
      tag,
      currentPage,
      page,
      pageSize,
      nextPage,
      previousPage,
      formatDate,
    };
  },
});
</script>
<style scoped>
.button-container {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  gap: 2rem;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.post-container {
  justify-self: flex-end;
  align-self: flex-end;
}
</style>
