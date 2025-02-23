import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PotIcon from "../../assets/icons/arcticons_rakuten-recipe.svg"
import ErrorIcon from "../../assets/icons/error.svg?react";

export default function HomePage() {
  const [searchState, setSearchState] = useState("default");  // Search form logic 
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFocus = (e) => {
    setSearchState("active");
    setError("");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter some ingredients to search."); // Set error message
      return; // Prevent form submission
    }

    setError(""); // Clear any previous error
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="home">
      <article className="home__container">
        <img className="home__image" src={PotIcon} alt="cooking pot icon" />
        <h1 className="home__title">Got ingredients? <br />Let's make something tasty!</h1>
        <form className="search-ingredients" onSubmit={handleSearch}>
          <div className="search-ingredients__input-container"> 
            <input
              type="text"
              className=
                {`search-ingredients__input 
                ${searchState === "active" ? "search-ingredients__input--active" : ""}
                ${error ? "recipe-form__input--error" : "" }`}
              placeholder="Your ingredients..."
              value={searchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {error && <div className="recipe-form__error-container">
              <ErrorIcon className="recipe-form__icon recipe-form__icon--error" />
              <p className="recipe-form__error-message">{error}</p>
            </div>}
          </div>
          <button type="submit" className="search-ingredients__button">
            Find me a recipe
          </button>
        </form>
      </article>

    </section>
  )
};


