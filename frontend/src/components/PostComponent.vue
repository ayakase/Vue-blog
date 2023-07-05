<template>
  <div class="container">
    <div v-if="postArray" class="post-container">
      <v-card
        class="mx-auto"
        width="400"
        v-for="(post, index) in postArray"
        :key="post"
      >
        <v-card-title class="post-title" @click.prevent="goDetail(post.id)">
          {{ post.title }}
        </v-card-title>

        <v-card-subtitle
          @click.prevent="gotoUser(post.user_id)"
          class="author-name"
        >
          Author: {{ post.author.name }}
        </v-card-subtitle>
        <v-card-subtitle
          class="date-published"
          @click.prevent="gotoDate(post.published_at)"
        >
          Published at: {{ formatDate(post.published_at) }}
        </v-card-subtitle>
        <div class="image-container" @click.prevent="goDetail(post.id)">
          <img
            v-if="post.thumbnail_url"
            :src="post.thumbnail_url"
            class="thumbnail"
            alt="Not Found"
            onerror="this.src='../src/assets/placeholder.png'"
          />
          <img
            v-else
            class="thumbnail"
            src="https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png"
          />
          <div class="overlay">
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click.prevent="goDetail(post.id)"
            >
              read more
            </v-btn>
          </div>
        </div>
        <v-card-subtitle> {{ post.views_count }} views</v-card-subtitle>
        <v-card-actions>
          <v-btn
            color="orange-lighten-2"
            variant="text"
            @click.prevent="goDetail(post.id)"
          >
            read more
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="toggle(index)"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-if="show[index]">
            <v-divider></v-divider>

            <v-card-text>
              {{ post.contents_short }}
            </v-card-text>
          </div>
        </v-expand-transition>
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
</template>

<script>
import { defineComponent, ref } from "vue";
import router from "../router";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

export default defineComponent({
  props: {
    postArray: {
      type: Array,
      required: true,
    },
  },
  components: { BeatLoader },
  setup() {
    let show = ref([]);
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
    return {
      show,
      toggle,
      goDetail,
      gotoUser,
      formatDate,
      gotoDate,
    };
  },
});
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.post-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-items: flex-start;
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
.thumbnail {
  width: 100%;
  border: 10px solid rgb(255, 255, 255);
  display: block;
  margin: auto;
  padding: auto;
  height: 15rem;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  color: #f1f1f1;
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
}
.image-container:hover .overlay {
  opacity: 1;
}
.image-container {
  position: relative;
}
</style>
