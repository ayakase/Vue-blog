<template>
  <div v-if="postArray">
    <!-- <h1>{{ userInfo.name }}</h1> -->
    <!-- <img :src="'https://images.viblo.asia/avatar/' + userInfo.avatar" alt="" /> -->
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
import { defineComponent, ref, onMounted } from "vue";
import api from "../api";
import { useRoute } from "vue-router";
import PostComponent from "@/components/PostComponent.vue";

export default defineComponent({
  name: "UserPost",
  components: { PostComponent },
  setup() {
    const route = useRoute();
    let currentPage = ref(0);
    const pageSize = 8;
    let userId = route.query.id;
    let postArray = ref();
    let userInfo = ref();
    let totalPages = ref();
    let page = ref();

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
        .get("/user/" + userId + "/" + page)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      page.value = 1;
      api
        .get("/user/" + userId + "/" + page.value)
        .then((response) => {
          // postArray.value = response.data;
          // userInfo.value = response.data[0].author;
          // console.log(userInfo.value);
          // document.title = `${response.data[0].author.name}`;
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
      userId,
      currentPage,
      page,
      pageSize,
      nextPage,
      previousPage,
      userInfo,
      totalPages,
      goToPage,
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
