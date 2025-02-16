import "./RecipeSearchPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";

export default function RecipeSearchPage() {
  const [recipes, setRecipes] = useState([]); // State to store recipes data

  const getRecipes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes')
      console.log(response.data);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

 // Search form logic and functionality
  const [searchState, setSearchState] = useState("default");

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  return (
    <section className="recipe-search">
      <form className="recipe-search__form">
        <input
          type="text"
          className={`recipe-search__input ${searchState === "active" ? "recipe-search__input--active" : ""
            }`}
          placeholder="Your ingredients..."
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="submit" className="recipe-search__button">
          Find me a recipe
        </button>
      </form>
      <SearchRecipeCard recipes={recipes} basePath="/search-results" />
    </section>
  )
}
