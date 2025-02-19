import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PotIcon from "../../assets/icons/arcticons_rakuten-recipe.svg"

export default function HomePage() {
 
  const [searchState, setSearchState] = useState("default");  // Search form logic and functionality
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="home">
      <article className="home__container">
        <img className="home__image" src={PotIcon} alt="cooking pot icon" />
        <h1 className="home__title">Got ingredients? <br />Let's make something tasty!</h1>
        <form className="search-ingredients" onSubmit={handleSearch}>
          <input
            type="text"
            className=
              {`search-ingredients__input 
              ${searchState === "active" ? "search-ingredients__input--active" : ""}`}
            placeholder="Your ingredients..."
            value={searchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-ingredients__button">
            Find me a recipe
          </button>
        </form>
      </article>

    </section>
  )
};


