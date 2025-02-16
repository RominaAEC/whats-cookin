import "./HomePage.scss";
import { useState, useEffect } from "react";
import PotIcon from "../../assets/icons/arcticons_rakuten-recipe.svg"

export default function HomePage() {
  // Search form logic and functionality
  const [searchState, setSearchState] = useState("default");

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  return (
    <section className="home">
      <article className="home__container">
        <img className="home__image" src={PotIcon} alt="cooking pot icon" />
        <h1 className="home__title">Got ingredients? <br />Let's make something tasty!</h1>
        <form className="search-ingredients">
          <input
            type="text"
            className={`search-ingredients__input ${searchState === "active" ? "search-ingredients__input--active" : ""
              }`}
            placeholder="Your ingredients..."
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="submit" className="search-ingredients__button">
            Find me a recipe
          </button>
        </form>
      </article>

    </section>
  )
};


