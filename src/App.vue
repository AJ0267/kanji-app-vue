<template>
  <div>
    <div class="navbar bg-base-100 shadow-md mb-6" v-if="$route.name === 'home'">
      <a class="btn btn-ghost text-xl">KanjiApp</a>
    </div>
    
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
