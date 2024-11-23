<template>
    <div class="min-h-screen bg-gray-900 text-white">
      <Navbar
        title="Kanji Quiz"
        searchPlaceholder="Search in quiz..."
        buttonText="Search"
        @search="handleSearch"
      />
      <div class="p-4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-center">
            Kanji Quiz ({{ selectedLevel }})
          </h1>
          <!-- Dropdown to select level -->
          <select
            v-model="selectedLevel"
            @change="generateQuizQuestions"
            class="bg-gray-800 text-white p-2 rounded-md border-2 border-gray-600"
          >
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>
        </div>
  
        <div
          v-if="currentQuestion"
          class="kanji-tile p-6 bg-gray-800 rounded-lg shadow-md flex flex-col justify-between space-y-4 mx-auto max-w-lg"
        >
          <div class="text-center">
            <span class="text-4xl font-semibold text-orange-400">
              {{ currentQuestion.kanji }}
            </span>
          </div>
  
          <!-- Input for user to type the reading -->
          <div class="mt-4">
            <label class="block text-orange-400 text-lg mb-2"
              >What is the reading of this kanji?</label
            >
            <input
              v-model="userAnswer"
              @keyup.enter="submitAnswer"
              placeholder="Type the reading in kana..."
              type="text"
              autofocus
              class="w-full p-3 border-2 border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
  
          <!-- Feedback message after submission -->
          <div v-if="answerSubmitted" class="mt-4 text-center">
            <p
              :class="isAnswerCorrect ? 'text-green-500' : 'text-red-500'"
              class="text-lg font-semibold"
            >
              {{ feedbackMessage }}
            </p>
          </div>
  
          <!-- Action to go to the next question -->
          <div class="mt-6 flex justify-center">
            <button
              @click="nextQuestion"
              class="bg-orange-400 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500 disabled:bg-gray-500"
              :disabled="!answerSubmitted"
            >
              Next Question
            </button>
          </div>
        </div>
  
        <!-- Quiz Completion Screen -->
        <div v-if="!currentQuestion" class="text-center mt-6">
          <h2 class="text-3xl font-semibold text-orange-400">
            You completed the quiz!
          </h2>
          <p class="mt-2 text-lg text-white">
            Your score: {{ score }} / {{ kanjiQuiz.length }}
          </p>
          <button
            @click="restartQuiz"
            class="bg-orange-400 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500 mt-4"
          >
            Restart Quiz
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
        userAnswer: "",
        answerSubmitted: false,
        currentQuestionIndex: 0,
        score: 0,
        kanjiQuiz: [],
        isAnswerCorrect: false,
        feedbackMessage: "",
      };
    },
    computed: {
      currentQuestion() {
        return this.kanjiQuiz[this.currentQuestionIndex];
      },
    },
    methods: {
      generateQuizQuestions() {
        const selectedKanjiData = kanjiData[this.selectedLevel];
        this.kanjiQuiz = selectedKanjiData.map((kanjiItem) => {
          const correctAnswers = [];
          // Prioritize kunyomi as the default correct answer
          if (kanjiItem.kunyomi.length > 0) {
            correctAnswers.push(kanjiItem.kunyomi[0]);
          }
          // Add onyomi as a correct answer if available
          if (kanjiItem.onyomi.length > 0) {
            correctAnswers.push(kanjiItem.onyomi[0]);
          }
  
          return {
            kanji: kanjiItem.character,
            correctAnswers: correctAnswers.map((reading) =>
              reading.trim().toLowerCase()
            ),
          };
        });
  
        this.currentQuestionIndex = 0;
        this.score = 0;
      },
  
      submitAnswer() {
        this.answerSubmitted = true;
        const userAnswerNormalized = this.normalizeReading(
          this.userAnswer.trim().toLowerCase()
        );
  
        // Check if the normalized user answer matches any correct answers (both kunyomi and onyomi)
        if (
          this.currentQuestion.correctAnswers.some(
            (correctAnswer) =>
              this.normalizeReading(correctAnswer) === userAnswerNormalized
          )
        ) {
          this.isAnswerCorrect = true;
          this.feedbackMessage = "Correct!";
          this.score++;
          this.nextQuestion(); // Move to the next question immediately after a correct answer
        } else {
          this.isAnswerCorrect = false;
          this.feedbackMessage = `Wrong! The correct reading(s) are: ${this.formatCorrectAnswers(
            this.currentQuestion.correctAnswers
          ).join(", ")}`;
        }
      },
  
      nextQuestion() {
        this.userAnswer = "";
        this.answerSubmitted = false;
  
        if (this.currentQuestionIndex < this.kanjiQuiz.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.finishQuiz();
        }
      },
  
      finishQuiz() {
        // Trigger when quiz is finished
        this.feedbackMessage = `You completed the quiz! Your score: ${this.score} / ${this.kanjiQuiz.length}`;
      },
  
      restartQuiz() {
        this.generateQuizQuestions();
      },
  
      handleSearch(query) {
        this.searchQuery = query;
      },
  
      normalizeReading(reading) {
        // Normalize the reading to match both hiragana and katakana
        return reading
          .replace(/[\u3041-\u3096]/g, (match) =>
            String.fromCharCode(match.charCodeAt(0) + 0x60)
          ) // Convert hiragana to katakana
          .normalize("NFD"); // Normalize for comparison (to handle differences in input forms)
      },
  
      formatCorrectAnswers(answers) {
        return answers.map((answer) => {
          // If the answer is onyomi (katakana), convert it to katakana
          if (this.isOnyomi(answer)) {
            return this.convertToKatakana(answer); // Convert onyomi to katakana
          }
          return answer; // Leave kunyomi as is (hiragana)
        });
      },
  
      isOnyomi(reading) {
        // Check if the reading is onyomi (katakana)
        return /^[\u30A1-\u30F6]+$/.test(reading);
      },
  
      convertToKatakana(hiragana) {
        // Convert hiragana to katakana
        return hiragana.replace(/[\u3041-\u3096]/g, (match) =>
          String.fromCharCode(match.charCodeAt(0) + 0x60)
        );
      },
    },
    mounted() {
      this.generateQuizQuestions();
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>