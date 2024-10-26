<template>
  <a
    class="card bg-base-100 w-[96%] max-w-[400px] shadow-xl sm:w-[98%] sm:mx-2 ml-2 cursor-pointer"
    @click.prevent="$emit('onClick')"
  >
    <div class="card-body flex flex-col items-center justify-center h-full">
      <h1 class="text-5xl font-bold text-center select-none">{{ title }}</h1>
      <p class="text-center">{{ description }}</p>
    </div>
  </a>
</template>
<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
