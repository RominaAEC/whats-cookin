import "./SearchByIngredients.scss"
import { useState } from "react";

export default function SearchByIngredients() {

    const [searchState, setSearchState] = useState("default");

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  return (
    <form className="search-ingredients">
      <input
        type="text"
        className={`search-ingredients__input ${
            searchState === "active" ? "search-ingredients__input--active" : ""
          }`}
        placeholder="Your ingredients..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit" className="search-ingredients__button">
        Find me a recipe
      </button>
    </form>
  )
}
