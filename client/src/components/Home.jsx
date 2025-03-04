import React, { useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/short", { originalUrl })
      .then((res) => {
        setShortUrl(res.data.url.shortUrl);
        console.log("API RESPONSE", res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <h1>URL Shortner</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="originalUrl">Enter URL:</label>
          <input
            value={originalUrl}
            type="url"
            name="originalUrl"
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="short-url">
          <p>Shortened URL:</p>
          <a
            href={`http://localhost:3000/${shortUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
