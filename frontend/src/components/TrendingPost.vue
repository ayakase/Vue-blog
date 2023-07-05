<template>
  <div class="trending-container" v-if="postArray">
    <h2 class="trending-title">Trending</h2>
    <v-divider :thickness="3" class="border-opacity-75 divider"></v-divider>
    <div class="trending-post" v-for="post in postArray" :key="post">
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
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import api from "../api";
import router from "../router";
export default defineComponent({
  setup() {
    let postArray = ref();
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
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
    onMounted(() => {
      api
        .get("/trending")
        .then((response) => {
          postArray.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return {
      postArray,
      formatDate,
      gotoDate,
      gotoUser,
      goDetail,
    };
  },
});
</script>
<style scoped>
.trending-container {
  width: 30rem;
  top: 5rem;
}
.divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
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
