<!-- <template>
    <div>
      <Navbar
        title="Kanji List"
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
   -->

<template>
  <Navbar
    title="Kanji List"
    titleColor="#333"
    searchPlaceholder="Search in list..."
    buttonText="Search"
    buttonColor="#48bb78"
    @search="handleSearch"
    on
  />
  <div class="p-4">
    <div class="mb-4 flex items-center space-x-2">
      <label for="level" class="text-gray-700">Select Kanji Level:</label>
      <select
        id="level"
        v-model="selectedLevel"
        @change="fetchKanjiData"
        class="border border-gray-300 rounded-md p-2"
      >
        <option value="n5">N5</option>
        <option value="n4">N4</option>
        <option value="n3">N3</option>
        <option value="n2">N2</option>
        <option value="n1">N1</option>
      </select>
    </div>

    <h1 class="text-xl font-bold mb-4">
      Kanji List ({{ selectedLevel.toUpperCase() }})
    </h1>

    <!-- Responsive Grid Layout -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2"
    >
      <a
        v-for="(kanji, index) in paginatedKanji"
        :key="index"
        class="kanji-tile p-4 border rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-blue-500"
        @click="showKanjiAlert(kanji)"
      >
        <span class="text-2xl">{{ kanji.character }}</span>
        <span class="ml-4 text-gray-600">
          {{ kanji.meanings.slice(0, 2).join(", ") }}
          <!-- Limit to 2 meanings -->
          <span v-if="kanji.meanings.length > 2">...</span>
          <!-- Indicate more meanings -->
        </span>
      </a>
    </div>

    <!-- Centered Pagination Controls -->
    <div class="flex justify-center items-center mt-4 space-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        :class="{
          'bg-gray-300 hover:bg-gray-400': currentPage > 1,
          'bg-gray-200 text-gray-400 cursor-not-allowed': currentPage === 1,
        }"
        class="text-gray-700 font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <span>{{ currentPage }} out of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        :class="{
          'bg-gray-300 hover:bg-gray-400': currentPage < totalPages,
          'bg-gray-200 text-gray-400 cursor-not-allowed':
            currentPage === totalPages,
        }"
        class="text-gray-700 font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import n5Data from "@/assets/KanjiData/N5KanjiData.json";
import n4Data from "@/assets/KanjiData/N4KanjiData.json";
import n3Data from "@/assets/KanjiData/N3KanjiData.json";
import n2Data from "@/assets/KanjiData/N2KanjiData.json";
import n1Data from "@/assets/KanjiData/N1KanjiData.json";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      kanjiData: [],
      selectedLevel: "n5",
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredKanji.length / this.itemsPerPage);
    },
    paginatedKanji() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredKanji.slice(start, start + this.itemsPerPage);
    },
    filteredKanji() {
      const search = this.searchQuery.trim().toLowerCase();
      if (!search) {
        return this.kanjiData;
      }
      return this.kanjiData.filter((kanji) => {
        return (
          kanji.character.includes(search) ||
          kanji.meanings.some((meaning) =>
            meaning.toLowerCase().includes(search)
          )
        );
      });
    },
  },
  methods: {
    fetchKanjiData() {
      const kanjiFiles = {
        n5: n5Data.N5,
        n4: n4Data.N4,
        n3: n3Data.N3,
        n2: n2Data.N2,
        n1: n1Data.N1,
      };
      this.kanjiData = kanjiFiles[this.selectedLevel] || [];
      this.currentPage = 1;
      this.searchQuery = ""; // Clear the search query when changing levels
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    showKanjiAlert(kanji) {
      // Implement the logic to show the Kanji alert/modal here
      console.log("clicked on kanji", kanji.character);
      // You might want to use a dialog component here
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.fetchKanjiData(); // Fetch initial data
  },
};
</script>
