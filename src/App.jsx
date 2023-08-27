"use strict";

import { useState, useEffect } from "react";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./App.css";

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [quoteColor, setQuoteColor] = useState(getRandomColor());

  const changeQuote = async () => {
    const randomQuote = await getRandomQuote();
    setQuote(randomQuote);
    setQuoteColor(getRandomColor());
  };

  useEffect(() => {
    async function fetchRandomQuote() {
      const randomQuote = await getRandomQuote();
      setQuote(randomQuote);
    }
    fetchRandomQuote();
  }, []);

  async function getQuotes() {
    const url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const quotesData = await response.json();
      return quotesData.quotes;
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return [];
    }
  }

  async function getRandomQuote() {
    const quotes = await getQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function getRandomColor() {
    const red = Math.floor(Math.random() * 250);
    const green = Math.floor(Math.random() * 250);
    const blue = Math.floor(Math.random() * 250);
    return `rgb(${red},${green},${blue})`;
  }

  const transition = "all 3s";

  return (
    <div
      className="background"
      style={{ backgroundColor: quoteColor, transition }}
    >
      <div id="quote-box">
        <div className="quote-content">
          <h2 id="text" style={{ color: quoteColor, transition }}>
            <FaQuoteLeft
              size="30"
              style={{ marginRight: "10px", color: quoteColor, transition }}
            />
            {quote.quote}
            <FaQuoteRight
              size="30"
              style={{ marginLeft: "10px", color: quoteColor, transition }}
            />
          </h2>
          <h4 id="author" style={{ color: quoteColor, transition }}>
            ~ {quote.author}
          </h4>
        </div>
        <div className="buttons">
          <a
            href={
              "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}"
            }
            id="tweet-quote"
            style={{
              backgroundColor: quoteColor,
              marginRight: "10px",
              transition,
            }}
          >
            <FaTwitter color="white" />
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            style={{ backgroundColor: quoteColor, transition }}
          >
            Generate Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
