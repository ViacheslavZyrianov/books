<template>
  <div id="app">
    <books-table />
  </div>
</template>

<script>
import booksTable from './components/BooksTable.vue'

export default {
  name: 'App',
  components: {
    booksTable
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
