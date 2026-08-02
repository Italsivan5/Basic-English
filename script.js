// ===== DATA =====
const alphabetData = [
  { letter: "A", word: "Apple", hebrew: "תפוח", emoji: "🍎" },
  { letter: "B", word: "Ball", hebrew: "כדור", emoji: "⚽" },
  { letter: "C", word: "Cat", hebrew: "חתול", emoji: "🐱" },
  { letter: "D", word: "Dog", hebrew: "כלב", emoji: "🐶" },
  { letter: "E", word: "Elephant", hebrew: "פיל", emoji: "🐘" },
  { letter: "F", word: "Fish", hebrew: "דג", emoji: "🐟" },
  { letter: "G", word: "Grapes", hebrew: "ענבים", emoji: "🍇" },
  { letter: "H", word: "Hat", hebrew: "כובע", emoji: "🎩" },
  { letter: "I", word: "Ice cream", hebrew: "גלידה", emoji: "🍦" },
  { letter: "J", word: "Juice", hebrew: "מיץ", emoji: "🧃" },
  { letter: "K", word: "Kite", hebrew: "עפיפון", emoji: "🪁" },
  { letter: "L", word: "Lion", hebrew: "אריה", emoji: "🦁" },
  { letter: "M", word: "Moon", hebrew: "ירח", emoji: "🌙" },
  { letter: "N", word: "Nest", hebrew: "קן", emoji: "🪺" },
  { letter: "O", word: "Orange", hebrew: "תפוז", emoji: "🍊" },
  { letter: "P", word: "Pig", hebrew: "חזיר", emoji: "🐷" },
  { letter: "Q", word: "Queen", hebrew: "מלכה", emoji: "👸" },
  { letter: "R", word: "Rainbow", hebrew: "קשת", emoji: "🌈" },
  { letter: "S", word: "Sun", hebrew: "שמש", emoji: "☀️" },
  { letter: "T", word: "Tiger", hebrew: "נמר", emoji: "🐯" },
  { letter: "U", word: "Umbrella", hebrew: "מטריה", emoji: "☂️" },
  { letter: "V", word: "Van", hebrew: "ואן", emoji: "🚐" },
  { letter: "W", word: "Watermelon", hebrew: "אבטיח", emoji: "🍉" },
  { letter: "X", word: "Xylophone", hebrew: "קסילופון", emoji: "🎼" },
  { letter: "Y", word: "Yo-yo", hebrew: "יויו", emoji: "🪀" },
  { letter: "Z", word: "Zebra", hebrew: "זברה", emoji: "🦓" },
];

const sentencesData = [
  { emoji: "🐱", sentence: "I see a cat.", hebrew: "אני רואה חתול." },
  { emoji: "🐶", sentence: "The dog can run.", hebrew: "הכלב יכול לרוץ." },
  { emoji: "☀️", sentence: "The sun is hot.", hebrew: "השמש חמה." },
  { emoji: "🌈", sentence: "I like the rainbow.", hebrew: "אני אוהב את הקשת." },
  { emoji: "🍎", sentence: "I eat an apple.", hebrew: "אני אוכל תפוח." },
  { emoji: "🐦", sentence: "The bird can fly.", hebrew: "הציפור יכולה לעוף." },
  { emoji: "💧", sentence: "I drink water.", hebrew: "אני שותה מים." },
  { emoji: "📚", sentence: "I read a book.", hebrew: "אני קורא ספר." },
  { emoji: "🐟", sentence: "The fish can swim.", hebrew: "הדג יכול לשחות." },
  { emoji: "🏠", sentence: "This is my house.", hebrew: "זה הבית שלי." },
  { emoji: "👩‍👧", sentence: "I love my mom.", hebrew: "אני אוהב את אמא שלי." },
  { emoji: "🐻", sentence: "The bear is big.", hebrew: "הדוב גדול." },
];

const numbersData = [
  { digit: 1, word: "One", hebrew: "אחת", emoji: "⭐" },
  { digit: 2, word: "Two", hebrew: "שתיים", emoji: "⭐⭐" },
  { digit: 3, word: "Three", hebrew: "שלוש", emoji: "⭐⭐⭐" },
  { digit: 4, word: "Four", hebrew: "ארבע", emoji: "⭐⭐⭐⭐" },
  { digit: 5, word: "Five", hebrew: "חמש", emoji: "⭐⭐⭐⭐⭐" },
  { digit: 6, word: "Six", hebrew: "שש", emoji: "⭐⭐⭐⭐⭐⭐" },
  { digit: 7, word: "Seven", hebrew: "שבע", emoji: "⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 8, word: "Eight", hebrew: "שמונה", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 9, word: "Nine", hebrew: "תשע", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
  { digit: 10, word: "Ten", hebrew: "עשר", emoji: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐" },
];

const tileColors = [
  "#ff5da2", "#ff9a56", "#ffce54", "#7be36b",
  "#2fbf71", "#56d5ff", "#4a7dff", "#c56bff",
];

// ===== SPEECH =====
// Prefer natural-sounding online voices (Google/Microsoft) over robotic default ones.
let bestEnglishVoice = null;
let bestHebrewVoice = null;

function pickBestVoice(langPrefix, preferredNames) {
  const voices = window.speechSynthesis.getVoices();
  const matchingVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
  if (!matchingVoices.length) return null;

  for (const name of preferredNames) {
    const match = matchingVoices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  return matchingVoices[0];
}

function refreshVoices() {
  bestEnglishVoice = pickBestVoice("en", [
    "Google US English",
    "Microsoft Aria Online",
    "Microsoft Jenny Online",
    "Microsoft Guy Online",
    "Samantha",
  ]);
  bestHebrewVoice = pickBestVoice("he", [
    "Google עברית",
    "Microsoft Hila Online",
    "Microsoft Asaf Online",
    "Carmit",
  ]);
}

if ("speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
}

function speak(text, lang = "en-US") {
  if (!("speechSynthesis" in window)) return null;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.voice = lang === "he-IL" ? bestHebrewVoice : bestEnglishVoice;
  utter.rate = 0.95;
  utter.pitch = 1.05;
  window.speechSynthesis.speak(utter);
  return utter;
}

// Speaks the Hebrew translation first, then the English word/sentence.
function speakBilingual(hebrewText, englishText) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const hebrewUtter = speak(hebrewText, "he-IL");
  if (hebrewUtter) {
    hebrewUtter.onend = () => speak(englishText, "en-US");
  } else {
    speak(englishText, "en-US");
  }
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

  sayBtn.addEventListener("click", () => {
    const text = sayText(data[index]);
    speakBilingual(text.he, text.en);
  });

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
    letterGridSpeechTimer = setTimeout(() => speakBilingual(item.hebrew, item.word), 10000);
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
  sayText: (item) => ({ en: item.word, he: item.hebrew }),
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
  sayText: (item) => ({ en: item.sentence, he: item.hebrew }),
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
  sayText: (item) => ({ en: item.word, he: item.hebrew }),
  render: (item) => {
    document.getElementById("numEmoji").textContent = item.emoji;
    document.getElementById("numDigit").textContent = item.digit;
    document.getElementById("numWord").textContent = item.word;
  },
});
