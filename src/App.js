import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function EmojiFinder() {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading to false initially
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?access_key=012a87820736b64a3c928b71b8b7be4a3c924313`
        );
        const data = await response.json();
        setEmojis(data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };

    fetchEmojis();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      setSearchResult([]);
      setSearchPerformed(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when search is initiated
    const filteredEmojis = emojis.filter(
      (emoji) =>
        emoji.slug &&
        emoji.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(filteredEmojis);
    setSearchPerformed(true);
    setLoading(false); // Set loading to false once search is completed
  };

  return (
    <div className="App">
      <h1>Emoji Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
      </div>
      {loading && <div>Loading...</div>}{" "}
      {/* Display loading only when loading is true */}
      {!loading &&
        searchPerformed &&
        searchTerm &&
        searchResult.length === 0 && <div>No emojis found</div>}
      <div className="emojis">
        {searchTerm &&
          searchResult.map((emoji) => (
            <span
              key={emoji.slug}
              role="img"
              aria-label={emoji.slug}
              className="emoji animated"
            >
              {emoji.character}
            </span>
          ))}
      </div>
    </div>
  );
}

export default EmojiFinder;
