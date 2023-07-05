<template>
  <div class="outer-container">
    <PostComponent :postArray="postArray"></PostComponent>
    <div class="side-container">
      <!-- <TrendingPost></TrendingPost> -->
      <div class="trending-container" v-if="trendingArray">
        <h2 class="trending-title">Trending</h2>
        <v-divider :thickness="3" class="border-opacity-75 divider"></v-divider>
        <div class="trending-post" v-for="post in trendingArray" :key="post">
          <v-card>
            <v-card-title class="post-title" @click.prevent="goDetail(post.id)">
              {{ post.title }}</v-card-title
            >
            <v-card-subtitle @click.prevent="gotoUser(post.user_id)">
              Author: {{ post.author.name }}
            </v-card-subtitle>
            <v-card-subtitle
              class="date-published"
              @click.prevent="gotoDate(post.published_at)"
            >
              Published at: {{ formatDate(post.published_at) }}
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </div>
  </div>
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
import router from "../router";
import PostComponent from "@/components/PostComponent.vue";
// import TrendingPost from "@/components/TrendingPost.vue";

export default defineComponent({
  name: "HomeView",
  components: { PostComponent },
  setup() {
    let show = ref([]);
    let postArray = ref();
    let totalPages = ref();
    let page = ref();
    let trendingArray = ref();
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
    function gotoDate(date) {
      router.push({
        name: "date",
        query: {
          date: date,
        },
      });
    }
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    function goToPage(page) {
      api
        .get("/posts/" + page)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      document.title = "Home Tab";
      page.value = 1;
      api
        .get("/posts/" + page.value)
        .then((response) => {
          postArray.value = response.data.rows;
          totalPages.value = response.data.count / 12;
        })
        .catch((error) => {
          console.error(error);
        });
      api
        .get("/trending")
        .then((response) => {
          trendingArray.value = response.data;
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
      formatDate,
      gotoDate,
      totalPages,
      goToPage,
      page,
      trendingArray,
    };
  },
});
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.load-container {
  height: 50rem;
}
.mx-auto {
  margin-top: 10px;
}
.post-title:hover {
  color: #ffb74d;
  cursor: pointer;
}
.author-name {
  color: #000000;
  cursor: pointer;
}
.outer-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.trending-post {
  width: 30rem;
}
.page-input-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: auto;
  width: 10rem;
}
.page-input {
  width: 3rem;
  border: 1px solid black;
}
.side-container {
  margin-right: 0.5rem;
  position: sticky;
  top: 0rem;
  height: 45rem;
}
.trending-container {
  width: 30rem;
  top: 5rem;
}
.divider {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.trending-post {
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease, width 1s ease;
}
.trending-post:hover {
  transform: translateX(-10rem);
  width: 40rem;
}
.post-title:hover {
  color: #ffb74d;
  cursor: pointer;
}
.date-published {
  margin-bottom: 1rem;
}
</style>
