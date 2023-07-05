<template>
  <h1 class="title">Posts published on {{ formatDate(date) }}</h1>
  <PostComponent :postArray="postArray"></PostComponent>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import api from "../api";
import router from "../router";
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
    let date = route.query.date;
    let show = ref([]);
    let postArray = ref();
    function toggle(index) {
      show.value[index] = !show.value[index];
    }
    function goDetail(id) {
      router.push({
        name: "detail",
        query: {
          id: id,
        },
      });
    }
    function gotoUser(id) {
      router.push({
        name: "user",
        query: {
          id: id,
        },
      });
    }
    const displayedItems = computed(() => {
      const start = currentPage.value * pageSize;
      const end = start + pageSize;
      return postArray.value.slice(start, end);
    });
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
      document.title = `${formatDate(date)}`;

      api
        .get("/date/" + date)
        .then((response) => {
          postArray.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return {
      show,
      postArray,
      toggle,
      goDetail,
      gotoUser,
      currentPage,
      date,
      page,
      pageSize,
      nextPage,
      previousPage,
      displayedItems,
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
.title {
  margin-left: 9rem;
}
</style>
