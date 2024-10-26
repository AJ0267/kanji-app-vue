<template>
    <div>
      <Navbar
        title="Search"
        titleColor="#333"
        searchPlaceholder="Search for something..."
        buttonText="Go"
        buttonColor="#5a67d8"
        @search="handleSearch"
      />
      <h1>Search Page Content</h1>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue'
  
  export default {
    components: {
      Navbar
    },
    methods: {
      handleSearch(query) {
        console.log('Search query:', query)
        
      }
    }
  }
  </script>
  