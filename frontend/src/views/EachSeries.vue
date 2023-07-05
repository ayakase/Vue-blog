<template>
  <p>asn</p>
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
import { defineComponent, ref, onMounted } from "vue";
import api from "../api";
// import router from "../router";
import { useRoute } from "vue-router";
import PostComponent from "@/components/PostComponent.vue";
export default defineComponent({
  name: "EachSeries",
  components: { PostComponent },
  setup() {
    const route = useRoute();
    let currentPage = ref(0);
    let page = 1;
    let totalPages = ref();
    const pageSize = 8;
    let postArray = ref();
    let series = route.query.series;
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

    function goToPage(page) {
      console.log(page);
      api
        .get("/serieslist/" + series + "/" + page)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      console.log(series);
      api
        .get("/serieslist/" + series + "/" + page)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
          console.log(totalPages.value);
          console.log(postArray.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return {
      postArray,
      series,
      totalPages,
      goToPage,
      previousPage,
      nextPage,
      pageSize

    };
  },
});
</script>
<style></style>
