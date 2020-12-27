<template>
  <ol class="list">
    <li v-for="item in items" :key="item.id">
      <p>
        {{ item.title }}
        <a :href="item.url" target="_blank">
          {{ item.date_modified | Hours }}:{{ item.date_modified | Minutes }}
        </a>
      </p>
    </li>
  </ol>
</template>

<script>
export default {
  name: "NewsList",
  props: {
    items: Array,
  },
  filters: {
    Hours: function (value) {
      if (!value) return "";
      const timeObj = new Date(value);
      return timeObj.getHours();
    },
    Minutes: function (value) {
      if (!value) return "";
      const timeObj = new Date(value);
      return timeObj.getMinutes();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  max-width: 50rem;
}

li {
  margin-top: 1rem;
}
</style>
