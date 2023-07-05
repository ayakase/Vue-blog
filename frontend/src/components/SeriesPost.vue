<template>
  <!-- <v-carousel
    v-if="posts"
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
    :visible="3"
  >
    <v-carousel-item v-for="(post, i) in posts" :key="i">
      <v-sheet :color="red" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">{{ post.title }}</div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel> -->
  <div class="side-container">
    <div>
      <h2>Series</h2>
      <v-divider :thickness="3" class="border-opacity-75 divider"></v-divider>
      <div v-for="post in posts" :key="post">
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
</template>
<script>
import api from "../api";
import { defineComponent, ref, onMounted } from "vue";
import router from "../router";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    let id = route.query.id;
    let posts = ref();
    onMounted(() => {
      api.get("/seriespost/" + id).then((response) => {
        posts.value = response.data;

        console.log(posts.value);
      });
    });
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
      setTimeout(() => {
        window.location.reload();
      }, 200);
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
    return {
      route,
      id,
      posts,
      formatDate,
      gotoDate,
      gotoUser,
      goDetail,
    };
  },
});
</script>
<style></style>
