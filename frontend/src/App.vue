<template>
  <div class="content-container">
    <div><router-view></router-view></div>
    <!-- <div><trending-post></trending-post></div> -->
  </div>
  <div class="mx-auto my-4">
    <v-btn color="deep-purple" variant="outlined" @click="active = !active">
      Toggle Navigation
    </v-btn>
  </div>
  <v-layout class="overflow-visible" style="height: 80px">
    <v-bottom-navigation
      v-model="value"
      :bg-color="color"
      :active="active"
      grow
    >
      <router-link to="/">
        <v-btn>
          <v-icon>mdi-post</v-icon>
          <p>Homepage</p>
        </v-btn>
      </router-link>
      <router-link to="/series">
        <v-btn>
          <v-icon>mdi-note-multiple-outline</v-icon>
          <p>Series</p>
        </v-btn>
      </router-link>
      <router-link to="/tagsearch">
        <v-btn>
          <v-icon>mdi-tag-arrow-down-outline</v-icon>
          <p>Tags</p>
        </v-btn>
      </router-link>
      <router-link to="/author">
        <v-btn>
          <v-icon>mdi-account-group</v-icon>
          <p>Author</p>
        </v-btn>
      </router-link>
      <router-link to="/time">
        <v-btn>
          <v-icon>mdi-calendar-month</v-icon>
          <p>Date</p>
        </v-btn>
      </router-link>
      <router-link to="/search">
        <v-btn>
          <v-icon>mdi-magnify</v-icon>
          <p>Search</p>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </v-layout>
  <transition name="float-up">
    <live-search
      v-if="showBox"
      @mouseover="showBox = true"
      @mouseleave="showBox = false"
    ></live-search>
  </transition>
</template>

<script>
import { ref } from "vue";
import LiveSearch from "./components/LiveSearch.vue";
// import TrendingPost from "./components/TrendingPost.vue";
export default {
  components: { LiveSearch },
  setup() {
    const showBox = ref(false);
    function setShow() {
      setTimeout(() => {
        showBox.value = true;
      }, 1000);
    }
    function setHide() {
      setTimeout(() => {
        showBox.value = false;
      }, 1000);
    }
    return {
      showBox,
      setHide,
      setShow,
    };
  },
  data: () => ({ value: 0, active: true }),
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "#5f9ea0";
        case 1:
          return "teal";
        case 2:
          return "#f4a460";
        case 3:
          return "indigo";
        case 4:
          return "#f08080";
        case 5:
          return "#6a5acd";
        default:
          return "blue-grey";
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.content {
  background-color: aliceblue;
}
p {
  margin-bottom: 0.7rem;
}
/* floating up animation */
.float-up-enter-active {
  transition: all 0.3s ease-out;
}
.float-up-enter {
  transform: translateY(50px);
  opacity: 0;
}
.float-up-leave-active {
  transition: all 0.3s ease-out;
}
.float-up-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
.content-container {
  display: flex;
  flex-direction: row;
}
</style>
