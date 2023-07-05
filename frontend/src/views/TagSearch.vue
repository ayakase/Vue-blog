<template>
  <div class="container">
    <div class="tag-container" v-if="tagArray">
      <v-card
        v-for="tag in tagArray"
        :key="tag"
        class="individual-tag"
        @click="goToPost(tag.name)"
      >
        <v-card-title class="post-title" @click.prevent="">
          {{ tag.name }}
        </v-card-title>
        <v-card-subtitle> {{ tag.posts_count }} Posts </v-card-subtitle>
        <div class="image-container">
          <img :src="tag.image" alt="" class="tag-image" />
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
              @click="goToTagPage(page)"
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
      @keyup.enter="goToTagPage(Number(page))"
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
    let tagArray = ref();
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
    function goToPost(name) {
      console.log(name);
      router.push({
        name: "tags",
        query: {
          tag: name,
        },
      });
    }
    function goToTagPage(page) {
      console.log(page);

      api
        .get("/gettags/" + page)
        .then((response) => {
          tagArray.value = response.data.rows;
          totalPages.value = response.data.count / 30;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      document.title = `Tags`;
      page.value = 1;
      api
        .get("/gettags/" + page.value)
        .then((response) => {
          tagArray.value = response.data.rows;
          console.log(tagArray.value);
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
      tagArray,
      page,
      goToPost,
      goToTagPage,
    };
  },
});
</script>
<style scoped>
.container {
  margin-top: 2rem;
  width: 100%;
}
.tag-container {
  margin: auto;
  padding: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4rem;
  flex-wrap: wrap;
}
.individual-tag {
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}
.individual-tag:hover {
  transform: translateY(-1.5rem);
}
.tag-image {
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
