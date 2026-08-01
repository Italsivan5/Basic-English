// ===== DATA =====
const alphabetData = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Grapes", emoji: "🍇" },
  { letter: "H", word: "Hat", emoji: "🎩" },
  { letter: "I", word: "Ice cream", emoji: "🍦" },
  { letter: "J", word: "Juice", emoji: "🧃" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Moon", emoji: "🌙" },
  { letter: "N", word: "Nest", emoji: "🪺" },
  { letter: "O", word: "Orange", emoji: "🍊" },
  { letter: "P", word: "Pig", emoji: "🐷" },
  { letter: "Q", word: "Queen", emoji: "👸" },
  { letter: "R", word: "Rainbow", emoji: "🌈" },
  { letter: "S", word: "Sun", emoji: "☀️" },
  { letter: "T", word: "Tiger", emoji: "🐯" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Van", emoji: "🚐" },
  { letter: "W", word: "Watermelon", emoji: "🍉" },
  { letter: "X", word: "Xylophone", emoji: "🎼" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

const sentencesData = [
  { emoji: "🐱", sentence: "I see a cat." },
  { emoji: "🐶", sentence: "The dog can run." },
  { emoji: "☀️", sentence: "The sun is hot." },
  { emoji: "🌈", sentence: "I like the rainbow." },
  { emoji: "🍎", sentence: "I eat an apple." },
  { emoji: "🐦", sentence: "The bird can fly." },
  { emoji: "💧", sentence: "I drink water." },
  { emoji: "📚", sentence: "I read a book." },
  { emoji: "🐟", sentence: "The fish can swim." },
  { emoji: "🏠", sentence: "This is my house." },
  { emoji: "👩‍👧", sentence: "I love my mom." },
  { emoji: "🐻", sentence: "The bear is big." },
];

const numbersData = [
  { digit: 1, word: "One", emoji: "⭐" },
  { digit: 2, word: "Two", emoji: "⭐⭐" },
  { digit: 3, word: "Three", emoji: "⭐⭐⭐" },
  { digit: 4, word: "Four", emoji: "⭐⭐⭐⭐" },
  { digit: 5, word: "Five", emoji: "⭐⭐⭐⭐⭐" },
  { digit: 6, word: "Six", emoji: "⭐⭐⭐⭐⭐⭐" },
  { digit: 7, word: "Seven", emoji: "⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 8, word: "Eight", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 9, word: "Nine", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 10, word: "Ten", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
];

const tileColors = [
  "#ff5da2", "#ff9a56", "#ffce54", "#7be36b",
  "#2fbf71", "#56d5ff", "#4a7dff", "#c56bff",
];

// ===== SPEECH =====
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.85;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}

// ===== NAVIGATION =====
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll("[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => showScreen(btn.dataset.target));
});

// ===== CELEBRATION =====
function celebrate() {
  document.getElementById("celebration").classList.remove("hidden");
  speak("Great job! You did it!");
}
document.getElementById("celebrationClose").addEventListener("click", () => {
  document.getElementById("celebration").classList.add("hidden");
});

// ===== GENERIC CARD DECK BUILDER =====
function buildDeck({ data, prevBtn, nextBtn, progressEl, render, sayText, sayBtn }) {
  let index = 0;

  progressEl.innerHTML = "";
  data.forEach(() => {
    const dot = document.createElement("span");
    dot.className = "dot";
    progressEl.appendChild(dot);
  });

  function updateProgress() {
    [...progressEl.children].forEach((dot, i) => {
      dot.classList.toggle("current", i === index);
      dot.classList.toggle("done", i < index);
    });
  }

  function update() {
    render(data[index]);
    updateProgress();
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + data.length) % data.length;
    update();
  });

  nextBtn.addEventListener("click", () => {
    if (index === data.length - 1) {
      celebrate();
    }
    index = (index + 1) % data.length;
    update();
  });

  sayBtn.addEventListener("click", () => speak(sayText(data[index])));

  update();
  return {
    goTo(i) {
      index = i;
      update();
    },
  };
}

// ===== ABC LETTER GRID =====
let letterGridSpeechTimer = null;
const letterGrid = document.getElementById("letterGrid");
alphabetData.forEach((item, i) => {
  const tile = document.createElement("button");
  tile.className = "letter-tile";
  tile.textContent = item.letter;
  tile.style.background = tileColors[i % tileColors.length];
  tile.addEventListener("click", () => {
    showScreen("abc-card");
    abcDeck.goTo(i);

    clearTimeout(letterGridSpeechTimer);
    speak(item.letter);
    letterGridSpeechTimer = setTimeout(() => speak(item.word), 10000);
  });
  letterGrid.appendChild(tile);
});

// ===== ABC CARD DECK =====
const abcDeck = buildDeck({
  data: alphabetData,
  prevBtn: document.getElementById("abcPrev"),
  nextBtn: document.getElementById("abcNext"),
  progressEl: document.getElementById("abcProgress"),
  sayBtn: document.getElementById("abcSay"),
  sayText: (item) => item.word,
  render: (item) => {
    document.getElementById("abcEmoji").textContent = item.emoji;
    document.getElementById("abcLetter").textContent = `${item.letter}${item.letter.toLowerCase()}`;
    document.getElementById("abcWord").textContent = item.word;
  },
});

// ===== SENTENCE DECK =====
buildDeck({
  data: sentencesData,
  prevBtn: document.getElementById("sentPrev"),
  nextBtn: document.getElementById("sentNext"),
  progressEl: document.getElementById("sentProgress"),
  sayBtn: document.getElementById("sentSay"),
  sayText: (item) => item.sentence,
  render: (item) => {
    document.getElementById("sentEmoji").textContent = item.emoji;
    document.getElementById("sentText").textContent = item.sentence;
  },
});

// ===== NUMBERS DECK =====
buildDeck({
  data: numbersData,
  prevBtn: document.getElementById("numPrev"),
  nextBtn: document.getElementById("numNext"),
  progressEl: document.getElementById("numProgress"),
  sayBtn: document.getElementById("numSay"),
  sayText: (item) => item.word,
  render: (item) => {
    document.getElementById("numEmoji").textContent = item.emoji;
    document.getElementById("numDigit").textContent = item.digit;
    document.getElementById("numWord").textContent = item.word;
  },
});
