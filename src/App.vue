<template>
  <div>
    <div class="navbar bg-base-100" v-if="$route.name === 'home'">
      <a class="btn btn-ghost text-xl">kanjiApp</a>
    </div>
    
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
