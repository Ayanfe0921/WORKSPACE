const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-btn");

const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
];

async function getQuote() {
  quoteEl.innerText = "Fetching quote...";
  authorEl.innerText = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quoteEl.innerText = `"${data.quote}"`;
    authorEl.innerText = `- ${data.author}`;
  } catch (error) {
    const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteEl.innerText = `"${randomFallback.text}"`;
    authorEl.innerText = `- ${randomFallback.author}`;
  }
}

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteEl.innerText + " " + authorEl.innerText
  )}`;
  window.open(tweetUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

getQuote();