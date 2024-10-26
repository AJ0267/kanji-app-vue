<template>
    <div>
      <Navbar
        title="List"
        titleColor="#333"
        searchPlaceholder="Search in list..."
        buttonText="Search"
        buttonColor="#48bb78"
        @search="handleSearch"
      />
      <h1>List Page Content</h1>
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
  