<template>
  <div class="container">
    <div class="user-container" v-if="userArray">
      <v-card
        v-for="user in userArray"
        :key="user"
        class="individual-user"
        @click="goToUserPost(user.id)"
      >
        <v-card-title class="post-title" @click.prevent="">
          {{ user.name }}
        </v-card-title>
        <div class="image-container">
          <img
            v-if="user.avatar"
            :src="`https://images.viblo.asia/avatar/${user.avatar}`"
            alt=""
            class="user-image"
          />
          <img
            v-else
            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
            class="thumbnail"
          />
          <v-card-subtitle>
            {{ user.followers_count }} Followers
          </v-card-subtitle>

          <v-card-subtitle> {{ user.posts_count }} Posts </v-card-subtitle>
        </div>
        <v-card-actions>
          <v-btn>See Posts</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else class="load-container">
      <BeatLoader
        :loading="loading"
        :color="'#56c1ff'"
        :size="size"
      ></BeatLoader>
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
              @click="goToUserPage(page)"
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
      @keyup.enter="goToUserPage(Number(page))"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import router from "../router";
import api from "../api";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

export default defineComponent({
  components: { BeatLoader },
  setup() {
    let show = ref([]);
    let userArray = ref();
    let totalPages = ref([]);
    let page = ref(1);
    function toggle(index) {
      show.value[index] = !show.value[index];
    }
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    function goToUserPost(id) {
      console.log(name);
      router.push({
        name: "user",
        query: {
          id: id,
        },
      });
    }
    function goToUserPage(page) {
      console.log(page);
      api
        .get("/getauthor/" + page)
        .then((response) => {
          userArray.value = response.data.rows;
          totalPages.value = response.data.count / 30;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      document.title = `Authors`;
      page.value = 1;
      api
        .get("/getauthor/" + page.value)
        .then((response) => {
          userArray.value = response.data.rows;
          console.log(userArray.value);
          totalPages.value = response.data.count / 30;
          // this.postArray = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return {
      show,
      toggle,
      formatDate,
      totalPages,
      userArray,
      page,
      goToUserPage,
      goToUserPost,
    };
  },
});
</script>
<style scoped>
.container {
  margin-top: 2rem;
  width: 100%;
}
.user-container {
  margin: auto;
  padding: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4rem;
  flex-wrap: wrap;
}
.thumbnail {
  width: 6rem;
  display: block;
  margin: auto;
  padding: auto;
  object-fit: cover;
}
.individual-user {
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}
.individual-user:hover {
  transform: translateY(-1.5rem);
}
.user-image {
  border-radius: 50%;
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
</style>
