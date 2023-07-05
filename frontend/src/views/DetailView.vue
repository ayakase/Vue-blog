<template>
  <div id="bar"></div>
  <div class="detail-container">
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>Published at {{ formatDate(post.published_at) }}</p>
      <div
        v-for="tag in tagArray"
        :key="tag"
        class="ma-2"
        color="pink"
        label
        text-color="white"
        @click="getTag(tag)"
      >
        <v-chip>
          <v-icon start icon="mdi-label"></v-icon>
          <p>{{ tag }}</p>
        </v-chip>
      </div>
      <div v-html="renderedHtml" class="post-content"></div>
      <div class="comment-section">
        <div class="comment" v-for="comment in comments" :key="comment">
          <div>{{ comment.name }}</div>
          <div>{{ comment.username }}</div>
        </div>
      </div>
    </div>
    <div>
      <series-post></series-post>
    </div>
  </div>
  <scrollToTop></scrollToTop>
</template>
<script>
import SeriesPost from "@/components/SeriesPost.vue";
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import api from "../api";
import router from "../router";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

import { useSnakke } from "vue-snakke";
import ScrollToTop from "../components/ScrollToTop.vue";
export default {
  components: { ScrollToTop, SeriesPost },
  setup() {
    let { progress } = useSnakke();
    const route = useRoute();
    let id = route.query.id;
    let post = ref();
    let comments = ref([]);
    let tagArray = ref([]);
    let renderedHtml = ref();
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    function getTag(tag) {
      router.push({
        name: "tags",
        query: {
          tag: tag,
        },
      });
    }
    const parseMarkdown = (content) => {
      const md = new MarkdownIt({
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (error) {
              console.error(error);
            }
          }
          return "";
        },
      });
      return md.render(content);
    };
    function logScroll() {
      document.getElementById("bar").style.width = progress.value * 100 + "%";
    }
    onMounted(() => {
      window.addEventListener("scroll", logScroll);
      api
        .get("/detail/" + id)
        .then((response) => {
          post.value = response.data;
          comments.value = JSON.parse(post.value.commentators).data;
          tagArray.value = JSON.parse(post.value.tag);
          document.title = `${post.value.title}`;
          renderedHtml.value = parseMarkdown(post.value.contents);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", logScroll);
    });

    return {
      id,
      post,
      formatDate,
      getTag,
      parseMarkdown,
      progress,
      logScroll,
      comments,
      tagArray,
      renderedHtml,
    };
  },
};
</script>
<style>
.post-content {
  width: 70%;
  margin: auto;
  padding: auto;
}
pre:has(> code) {
  background-color: rgb(231, 231, 231);
  border: 1px solid #ccc;
  display: block;
  padding: 10px;
  overflow: scroll;
  width: calc(100% - 15px);
  overflow-x: auto;
  overflow-y: hidden;
}
code {
  background-color: rgb(231, 231, 231);
}
p:has(> img) {
  margin: auto;
  padding: auto;
}
img {
  margin: auto;
  padding: auto;
  max-width: 70rem;
}
ul {
  list-style-position: inside;
  padding-left: 0;
}

li {
  margin-left: 1.5em;
}
table,
td,
th {
  border: 1px solid;
  padding: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
a {
  color: rgb(96, 112, 255);
  text-decoration: none;
}
blockquote {
  background-color: rgb(231, 231, 231);
  border-left: 2px #5488c7 solid;
  padding: 1rem;
}

#bar {
  width: 0;
  background-color: rgb(115, 255, 146);
  height: 0.5rem;
  position: fixed;
  top: 0;
}
</style>
