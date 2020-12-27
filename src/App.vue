<template>
  <div id="app">
    <h1 class="title">{{ title }}</h1>
    <NewsList :items="items"></NewsList>
  </div>
</template>

<script>
import NewsList from "./components/NewsList.vue";

export default {
  name: "App",
  components: {
    NewsList,
  },
  data() {
    return {
      title: null,
      items: [],
    };
  },
  async created() {
    const response = await fetch("./rss.json");
    const data = await response.json();
    this.title = data.description;
    this.items = data.items;
  },
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function () {
      return {
        inner: "新浪实时财经",
      };
    },
    link: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        href: "http://pluckhuang.github.io/realtime-news/rss.xml",
        title: "Recent Entries",
      },
    ],
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 50px;
}

h1.title {
  margin-left: 1.5rem;
}
</style>
