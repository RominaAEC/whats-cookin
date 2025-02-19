import "./RecipeSearchPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";

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
  }, [location.search]);

  const getRecipes = async (query) => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');

      const searchIngredients = query.toLowerCase().split(",").map((ingredient) => ingredient.trim());

      const filteredRecipes = response.data.recipes.filter(recipe =>{
          return (
            searchIngredients.some((ingredient) => recipe.name.toLowerCase().includes(ingredient)) ||
            searchIngredients.some((ingredient) => recipe.ingredients.some ((recipeIngredient) => recipeIngredient.toLowerCase().includes(ingredient)))
          );
      });
      // console.log(response.data);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  }

 // Search form logic and functionality
  const [searchState, setSearchState] = useState("default");

  const handleFocus = (e) => {
    setSearchState("active");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <section className="recipe-search">
      <form className="recipe-search__form"  onSubmit={handleSearch}>
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
        <button type="submit" className="recipe-search__button">
          Find me a recipe
        </button>
      </form>
      <SearchRecipeCard recipes={recipes} basePath="/search-results" />
    </section>
  )
}
