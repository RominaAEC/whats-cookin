import "./RecipeSearchPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";
import ErrorIcon from "../../assets/icons/error.svg?react";
import BowlIcon from "../../assets/icons/arcticons_recipe-keeper.svg?react";

export default function RecipeSearchPage() {
  const [recipes, setRecipes] = useState([]); // State to store recipes data
  const [searchQuery, setSearchQuery] = useState("");
  const [noRecipesFound, setNoRecipesFound] = useState(false);
  const [searchState, setSearchState] = useState("default"); // input field state 
  const [error, setError] = useState(""); // input field error state

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    setSearchQuery(query);
    getRecipes(query);  // Pass the query to getRecipes

    if (query) {
      getRecipes(query);
    } else {
      setRecipes([]); // Clear recipes if there is no search query
      setNoRecipesFound(false); // Reset no recipes found state
    }

  }, [location.search]);

  const getRecipes = async (query) => {
    try {
      const [source1, source2] = await Promise.all([
        axios.get('https://dummyjson.com/recipes'),
        axios.get('http://localhost:8080/recipes')
      ]);

      const combinedRecipes = [
        ...source1.data.recipes.map(recipe => ({ ...recipe, source: "/search-results" })), // add source to determine basePath
        ...source2.data.map(recipe => ({ ...recipe, source: "/cookbook" }))
      ];

      // Filtering search results 
      const searchIngredients = query.toLowerCase().split(",").map((ingredient) => ingredient.trim());

      const filteredRecipes = combinedRecipes.filter(recipe => {

        let ingredientCount = 0;

        searchIngredients.forEach((ingredient) => {
          const includesName = recipe.name.toLowerCase().includes(ingredient);
          const includesIngredient = recipe.ingredients.some((recipeIngredient) =>
            recipeIngredient.toLowerCase().includes(ingredient));

          if (includesName || includesIngredient) {
            ingredientCount++;
          }
        });

        if (searchIngredients.length >= 3) {
          return ingredientCount >= 3;
        }

        return ingredientCount >= 1;
      });

      // Check if no recipes matched the search
      if (filteredRecipes.length === 0) {
        setNoRecipesFound(true); // Set no recipes found state
      } else {
        setNoRecipesFound(false); // Reset no recipes found state
      }

      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  }

  // Search form logic and functionality
  const handleFocus = (e) => {
    setSearchState("active");
    setError("");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    } else {
      setRecipes([]); // Clear recipes if the search query is empty
      setNoRecipesFound(false);
    }

    if (!searchQuery.trim()) {
      setError("Please enter some ingredients to search."); // Set error message
      return; // Prevent form submission
    }

    setError(""); // Clear any previous error state
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`); // Update the URL with the search query
    getRecipes(searchQuery); // Fetch recipes again
  };

  return (
    <section className="recipe-search">
      <form className="recipe-search__form" onSubmit={handleSearch}>
        <div className="recipe-search__input-container">
          <input
            type="text"
            className=
            {`recipe-search__input 
              ${searchState === "active" ? "recipe-search__input--active" : ""}
              ${error ? "recipe-form__input--error" : ""}`}
            placeholder="Your ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {error && <div className="recipe-form__error-container">
            <ErrorIcon className="recipe-form__icon recipe-form__icon--error" />
            <p className="recipe-form__error-message">{error}</p>
          </div>}
        </div>
        <button type="submit" className="recipe-search__button">
          Find me a recipe
        </button>
      </form>
      {(noRecipesFound || error) && (
        <div className="recipe-search__no-results">
          <BowlIcon className="recipe-search__no-results-icon" />
          <h3 className="recipe-search__no-results-message">No recipes found. Please try different ingredients.</h3>
        </div>
      )}
      <SearchRecipeCard recipes={recipes} />
    </section>
  )
}
