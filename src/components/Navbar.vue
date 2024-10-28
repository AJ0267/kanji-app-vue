<template>
  <div class="navbar shadow-lg bg-darkGray">
    <div class="flex-1">
      <router-link
        :to="homeLink"
        class="btn btn-ghost text-2xl text-brightOrange"
      >
        {{ title }}
      </router-link>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          v-model.trim="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="input input-bordered border-2 w-24 sm:w-20 md:w-40 lg:w-auto"
          :class="borderClass"
        />
      </div>
      <button
        class="btn shadow-md bg-brightOrange text-darkGray"
        @click="onSearch"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    searchPlaceholder: String,
    buttonText: String,
    homeLink: {
      type: String,
      default: '/' 
    },
    borderClass: String,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      if (this.searchQuery) {
        this.$emit('search', this.searchQuery); 
        this.searchQuery = '';
      }
    },
  },
};
</script>
