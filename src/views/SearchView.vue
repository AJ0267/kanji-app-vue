<!-- <template>
  <Navbar
    title="Search Kanji"
    titleColor="#333"
    searchPlaceholder="Search for something..."
    buttonText="Go"
    buttonColor="#5a67d8"
    @search="handleSearch"
  />

  <div>
    <div class="flex flex-col items-center p-4">
      <div
        class="flex flex-col sm:flex-row sm:justify-between mt-4 w-full max-w-[800px]"
      >
       
        <div
          class="bg-orange-100 shadow-lg rounded-lg p-4 mb-4 sm:mb-0 sm:w-full relative"
        >
          <div class="absolute top-4 right-4">
            <div
              class="text-6xl font-bold text-orange-600 bg-white rounded-md p-4 shadow-lg"
              v-if="kanjiData"
            >
              {{ kanjiData.kanji }}
            </div>
            <div
              class="text-6xl font-bold text-orange-600 bg-white rounded-md p-4 shadow-lg"
              v-else
            >
              {{ exampleData.kanji }}
             
            </div>
          </div>

          <h2 class="text-lg font-bold mb-2">Kanji Information</h2>
          <p class="mb-1">
            <strong>Grade:</strong>
            {{ kanjiData ? kanjiData.grade : exampleData.grade }}
          </p>
          <p class="mb-1">
            <strong>JLPT Level:</strong>
            {{
              kanjiData
                ? kanjiData.jlpt === null
                  ? "null"
                  : kanjiData.jlpt === 0
                  ? "N5"
                  : "N" + (kanjiData.jlpt + 1)
                : exampleData.jlpt === 0
                ? "N5"
                : "N" + (exampleData.jlpt + 1)
            }}
          </p>
          <p class="mb-1">
            <strong>Kanji:</strong>
            {{ kanjiData ? kanjiData.kanji : exampleData.kanji }}
          </p>
          <p class="mb-1">
            <strong>Meanings:</strong>
            {{
              kanjiData
                ? kanjiData.meanings.join(", ")
                : exampleData.meanings.join(", ")
            }}
          </p>
          <p class="mb-1">
            <strong>On Readings:</strong>
            {{
              kanjiData
                ? kanjiData.on_readings.join(", ")
                : exampleData.on_readings.join(", ")
            }}
          </p>
          <p>
            <strong>Kun Readings:</strong>
            {{
              kanjiData
                ? kanjiData.kun_readings.join(", ")
                : exampleData.kun_readings.join(", ")
            }}
          </p>
        </div>
      </div>

      
      <div
        v-if="!kanjiData && !loading && searchInitiated"
        class="mt-4 text-center text-gray-500"
      >
        <p>No data found. Please search for a Kanji character.</p>
      </div>

    
      <div
        v-if="kanjiData && searchInitiated"
        class="mt-4 w-full max-w-full cursor-pointer"
        @click="redirectToJisho"
      >
        <div class="bg-blue-100 shadow-lg rounded-lg p-4 text-center">
          <p class="font-bold text-blue-600">More Data</p>
          <p class="text-sm text-gray-500">
            Click for more details on Jisho.org
          </p>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <Navbar
    title="Search Kanji"
    titleColor="#333"
    searchPlaceholder="Search for something..."
    buttonText="Go"
    buttonColor="#5a67d8"
    @search="handleSearch"
  />

  <div class="flex justify-center p-4">
    <div class="flex flex-col items-center w-full max-w-[800px]">
      <!-- Kanji Card -->
      <div
        class="bg-orange-100 shadow-lg rounded-lg p-4 mb-4 w-full relative"
      >
        <div class="absolute top-4 right-4">
          <div
            class="text-6xl font-bold text-orange-600 bg-white rounded-md p-4 shadow-lg"
            v-if="kanjiData"
          >
            {{ kanjiData.kanji }}
          </div>
          <div
            class="text-6xl font-bold text-orange-600 bg-white rounded-md p-4 shadow-lg"
            v-else
          >
            {{ exampleData.kanji }}
            <!-- Display example kanji here -->
          </div>
        </div>

        <h2 class="text-xl font-bold mb-2">Kanji Information</h2>
        <br />
        <p class="mb-1">
          <strong>Grade:</strong>
          {{ kanjiData ? kanjiData.grade : exampleData.grade }}
        </p>
        <p class="mb-1">
          <strong>JLPT Level:</strong>
          {{
            kanjiData
              ? kanjiData.jlpt === null
                ? "null"
                : kanjiData.jlpt === 0
                ? "N5"
                : "N" + (kanjiData.jlpt + 1)
              : exampleData.jlpt === 0
              ? "N5"
              : "N" + (exampleData.jlpt + 1)
          }}
        </p>
        <br />
        <p class="mb-1">
          <strong>Kanji:</strong>
          {{ kanjiData ? kanjiData.kanji : exampleData.kanji }}
        </p>
        <p class="mb-1">
          <strong>Meanings:</strong>
          {{
            kanjiData
              ? kanjiData.meanings.join(", ")
              : exampleData.meanings.join(", ")
          }}
        </p>
        <p class="mb-1">
          <strong>On Readings:</strong>
          {{
            kanjiData
              ? kanjiData.on_readings.join(", ")
              : exampleData.on_readings.join(", ")
          }}
        </p>
        <p>
          <strong>Kun Readings:</strong>
          {{
            kanjiData
              ? kanjiData.kun_readings.join(", ")
              : exampleData.kun_readings.join(", ")
          }}
        </p>
        <!-- Example disclaimer -->
        <p v-if="!searchInitiated" class="mt-2 text-sm text-gray-500">
          ({{ exampleData.kanji }} is just for illustration.)
        </p>
      </div>

      <!-- Conditional message displayed only after a search is initiated -->
      <div
        v-if="!kanjiData && !loading && searchInitiated"
        class="mt-4 text-center text-gray-500"
      >
        <p>No data found. Please search for a Kanji character.</p>
      </div>

      <!-- Smaller Card for More Data with matching width -->
      <div
        v-if="kanjiData && searchInitiated"
        class="mt-4 w-full cursor-pointer"
        @click="redirectToJisho"
      >
        <div class="bg-blue-100 shadow-lg rounded-lg p-4 text-center w-full">
          <p class="font-bold text-blue-600">More Data</p>
          <p class="text-sm text-gray-500">
            Click for more details on Jisho.org
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      kanjiData: null,
      loading: false,
      searchInitiated: false,
      exampleData: {
        grade: 1,
        jlpt: 4,
        kanji: "人",
        meanings: ["person"],
        on_readings: ["ジン", "ニン"],
        kun_readings: ["-と", "-り", "ひと"],
      },
    };
  },
  methods: {
    handleSearch(query) {
      console.log("Search query:", query);
      this.searchInitiated = true;
      this.fetchKanjiData(query);
    },
    async fetchKanjiData(query) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://kanjiapi.dev/v1/kanji/${query}`
        );
        this.kanjiData = response.data;
      } catch (error) {
        console.error("Error fetching Kanji data:", error);
        this.kanjiData = null;
      } finally {
        this.loading = false;
      }
    },
    redirectToJisho() {
      if (this.kanjiData) {
        const kanji = this.kanjiData.kanji;
        window.open(`https://jisho.org/search/${kanji} %23kanji`, "_blank");
      }
    },
    resetData() {
      this.kanjiData = null;
      this.searchInitiated = false;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === "home") {
        this.resetData();
      }
    },
  },
};
</script>
