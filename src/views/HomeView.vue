<template>
  <div class="flex flex-wrap gap-4">
    <Card
      v-for="(card, index) in cards" 
      :key="index" 
      :title="card.title"
      :description="card.description"
      @onClick="changeRoute(card.route)"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; 

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter(); 

    const cards = [ 
      {
        title: "Search",
        description: "Search for single Kanji data.",
        route: '/search',
      },
      {
        title: "Kanji List",
        description: "lists of Kanji.",
        route: '/list',
      },
    ];

    const changeRoute = (route) => {
      console.log(`Navigating to ${route}...`);
      router.push(route); 
    };

    return { cards, changeRoute }; 
  },
};
</script>
