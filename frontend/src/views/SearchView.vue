<template>
  <div class="search-box">
    <v-text-field
      label="Label"
      append-icon="mdi-magnify"
      variant="solo"
      @keyup.enter="searchSubmit(searchValue)"
      v-model="searchValue"
    >
    </v-text-field>
  </div>
  <PostComponent :postArray="postArray"></PostComponent>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="totalPages"
              :total-visible="7"
              @click="goToPage(page)"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="page-input-container">
    <h3>Go to page:</h3>
    <input
      label=""
      v-model="page"
      class="page-input"
      type="number"
      min="0"
      @keyup.enter="goToPage(Number(page))"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import api from "../api";
// import router from "../router";
import { useRoute } from "vue-router";
import PostComponent from "@/components/PostComponent.vue";

export default defineComponent({
  name: "SearchView",
  components: { PostComponent },
  setup() {
    const route = useRoute();
    let currentPage = ref(0);
    let page = ref();
    const pageSize = 8;
    let userId = route.query.id;
    let show = ref([]);
    let postArray = ref();
    let totalPages = ref();
    let searchRef = ref();
    function toggle(index) {
      show.value[index] = !show.value[index];
    }
    function searchSubmit(searchValue) {
      page.value = 1;
      searchRef.value = searchValue;
      api
        .get("/search/" + searchValue + "/" + page.value)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function goToPage(page) {
      postArray.value = false;
      console.log(searchRef.value + page);
      api
        .get("/search/" + searchRef.value + "/" + page)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
    }

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

    return {
      show,
      postArray,
      toggle,
      userId,
      currentPage,
      page,
      pageSize,
      nextPage,
      previousPage,
      searchSubmit,
      goToPage,
      totalPages,
      searchRef,
    };
  },
});
</script>
<style scoped>
body {
  background-color: red;
}
.container {
  width: 100%;
  padding-top: 2rem;
}
.search-box {
  width: 30rem;
  margin: auto;
  padding: auto;
}
</style>
