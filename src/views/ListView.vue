<!-- <template>
  <div class="min-h-screen">
    <Navbar
      title="Kanji List"
      searchPlaceholder="Search in list..."
      buttonText="Search"
      @search="handleSearch"
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
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
      </div>

      <h1 class="text-xl font-bold mb-4">Kanji List ({{ selectedLevel }})</h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2"
      >
        <a
          v-for="(kanji, index) in paginatedKanji"
          :key="index"
          class="kanji-tile p-4 border rounded-lg shadow-md flex items-center justify-between cursor-pointer bg-darkGray"
          @click="showKanjiAlert(kanji)"
        >
          <span class="text-3xl text-brightOrange">{{ kanji.character }}</span>
          <span class="ml-4 text-lg font-semibold text-brightOrange">
            {{ kanji.meanings.slice(0, 2).join(", ") }}
            <span v-if="kanji.meanings.length > 2">...</span>
          </span>
        </a>
      </div>

      <div class="flex justify-center items-center mt-4 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="{
            'bg-softOrange text-darkGray hover:bg-brightOrange': currentPage > 1,
            'bg-gray-200 text-gray-400 cursor-not-allowed': currentPage === 1,
          }"
          class="font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>{{ currentPage }} out of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="{
            'bg-softOrange text-darkGray hover:bg-brightOrange':
              currentPage < totalPages,
            'bg-gray-200 text-gray-400 cursor-not-allowed':
              currentPage === totalPages,
          }"
          class="font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import kanjiData from "@/assets/KanjiData.json";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      kanjiData: [],
      selectedLevel: "N5",
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
      this.kanjiData = kanjiData[this.selectedLevel] || [];
      this.currentPage = 1;
      this.searchQuery = "";
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    showKanjiAlert(kanji) {
      console.log("clicked on kanji", kanji.character);
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
    this.fetchKanjiData();
  },
};
</script> -->

<template>
  <div class="min-h-screen">
    <Navbar
      title="Kanji List"
      searchPlaceholder="Search in list..."
      buttonText="Search"
      @search="handleSearch"
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
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
      </div>

      <h1 class="text-xl font-bold mb-4">Kanji List ({{ selectedLevel }})</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        <a
          v-for="(kanji, index) in paginatedKanji"
          :key="index"
          class="kanji-tile p-4 border rounded-lg shadow-md flex flex-col justify-between cursor-pointer bg-darkGray"
          @click="toggleKanji(kanji)"
        >
          <div class="flex justify-between w-full">
            <span class="text-3xl font-semibold text-brightOrange bg-white rounded-md p-2 shadow-lg"> 
              {{ kanji.character }}
            </span>
            <span class="ml-4  mt-3 text-lg text-brightOrange">
              {{ kanji.meanings.slice(0, 2).join(", ") }}
              <span v-if="kanji.meanings.length > 2">...</span>
            </span>
          </div>

          <!-- Expanded Information -->
          <div v-if="expandedKanji === kanji.character" class="mt-4">
            <p class="text-brightOrange text-lg mb-1"><strong>Meanings:</strong> <span class="text-softOrange ml-2">{{ kanji.meanings.join(", ") }}</span></p>
            <p class="text-brightOrange text-lg mb-1"><strong>On Readings:</strong> 
              <span v-if="kanji.onyomi.length" class="text-softOrange ml-2">{{ kanji.onyomi.join(", ") }}</span>
              <span v-else>No on readings available</span>
            </p>
            <p class="text-brightOrange text-lg mb-1"><strong>Kun Readings:</strong> 
              <span v-if="kanji.kunyomi.length" class="text-softOrange ml-2">{{ kanji.kunyomi.join(", ") }}</span>
              <span v-else class="text-softOrange ml-2">No kun readings available</span>
            </p>

            <!-- Action Buttons -->
            <div class="mt-4 flex justify-between">
              <button
                @click="closeKanji"
                class="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
              <button
                @click="openMore(kanji.character)"
                class="bg-softOrange text-darkGray font-bold py-2 px-4 rounded hover:bg-brightOrange"
              >
                More
              </button>
            </div>
          </div>
        </a>
      </div>

      <div class="flex justify-center items-center mt-4 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="{
            'bg-softOrange text-darkGray hover:bg-brightOrange': currentPage > 1,
            'bg-gray-200 text-gray-400 cursor-not-allowed': currentPage === 1,
          }"
          class="font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>{{ currentPage }} out of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="{
            'bg-softOrange text-darkGray hover:bg-brightOrange':
              currentPage < totalPages,
            'bg-gray-200 text-gray-400 cursor-not-allowed':
              currentPage === totalPages,
          }"
          class="font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>






<script>
import Navbar from "../components/Navbar.vue";
import kanjiData from "@/assets/KanjiData.json";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      kanjiData: [],
      selectedLevel: "N5",
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: "",
      expandedKanji: null, 
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
      this.kanjiData = kanjiData[this.selectedLevel] || [];
      this.currentPage = 1;
      this.searchQuery = "";
      this.expandedKanji = null; 
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
    },
    toggleKanji(kanji) {
      
      this.expandedKanji = this.expandedKanji === kanji.character ? null : kanji.character;
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
    openMore(kanji) {
      window.open(`https://jisho.org/search/${kanji} %23kanji`, "_blank");
    },
  },
  mounted() {
    this.fetchKanjiData();
  },
};
</script>





