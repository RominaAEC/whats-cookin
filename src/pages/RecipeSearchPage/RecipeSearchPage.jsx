import "./RecipeSearchPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";
import ErrorIcon from "../../assets/icons/error.svg?react";

export default function RecipeSearchPage() {
  const [recipes, setRecipes] = useState([]); // State to store recipes data
  const [searchQuery, setSearchQuery] = useState("");
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
    }
    
  }, [location.search]);

  const getRecipes = async (query) => {
    try {
      const [source1, source2] = await Promise.all([
        axios.get('https://dummyjson.com/recipes'),
        axios.get('http://localhost:8080/recipes')
      ]);

      const combinedRecipes = [
        ...source1.data.recipes, // add source to determine basePath
        ...source2.data
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

        if (searchIngredients.length === 1) {
          return ingredientCount >= 1;
        }

        return ingredientCount >= 2;

      });
      // console.log(response.data);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  }

  // Search form logic and functionality
  const [searchState, setSearchState] = useState("default");
  const [error, setError] = useState("");

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    } else {
      setRecipes([]); // Clear recipes if the search query is empty
    }

    if (!searchQuery.trim()) {
      setError("Please enter some ingredients to search."); // Set error message
      return; // Prevent form submission
    }

    // Clear any previous error
    setError("");

  };

  return (
    <section className="recipe-search">
      <form className="recipe-search__form" onSubmit={handleSearch}>
        <input
          type="text"
          className=
          {`recipe-search__input 
            ${searchState === "active" ? "recipe-search__input--active" : ""}`}
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
        <button type="submit" className="recipe-search__button">
          Find me a recipe
        </button>
      </form>
      <SearchRecipeCard recipes={recipes} basePath="/search-results" />
    </section>
  )
}
