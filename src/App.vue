<template>
  <div>
    <!-- Navbar with Dark Gray Background and Light Peach Text -->
    <div class="navbar bg-darkGray shadow-md mb-6" v-if="$route.name === 'home'">
      <a class="btn btn-ghost text-2xl text-brightOrange">KanjiApp</a>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>


<style></style>
