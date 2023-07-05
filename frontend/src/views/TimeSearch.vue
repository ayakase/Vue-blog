<template>
  <p>box</p>
  <div class="search-box">
    <v-text-field
      label="Label"
      append-icon="mdi-magnify"
      variant="solo"
      @keyup.enter="searchSubmit(searchValue)"
      v-model="searchValue"
    >
      <input type="date" />
    </v-text-field>
  </div>
</template>
<script></script>
<style scoped>
.search-box {
  width: 30rem;
  margin: auto;
  padding: auto;
}
</style>
