import "./CookbookPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import BookIcon from "../../assets/icons/book.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";
import BowlIcon from "../../assets/icons/arcticons_recipe-keeper.svg?react";
import CookbookRecipeCard from "../../components/CookbookRecipeCard/CookbookRecipeCard"

export default function CookbookPage() {
  const [recipes, setRecipes] = useState([]); // State to store all recipes data
  const [filteredRecipes, setFilteredRecipes] = useState([]); // State to store filtered recipes
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [loading, setLoading] = useState(true);

  // Search form logic and functionality // 
  const [searchState, setSearchState] = useState("default");
  const [error, setError] = useState("");

  const getRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/recipes');
      // console.log(response.data);
      setRecipes(response.data);
      setFilteredRecipes(response.data); // Initially, show all recipes
    } catch (error) {
      console.error("Error fetching recipes", error);
    }  finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  const handleFocus = (e) => {
    setSearchState("active");
    setError("");
  };

  const handleBlur = (e) => {
    setSearchState("default");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      // Filter recipes by name
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);

      // Display a message if no recipes match the search query
      if (filtered.length === 0) {
        setError("No recipes found");
      } else {
        setError("");
      }
    } else {
      // If the search query is empty, show all recipes
      setFilteredRecipes(recipes);
      setError("");
    }
  }
  return (
    <section className="cookbook">
      <article className="cookbook__header">
        <BookIcon className="cookbook__header-icon" />
        <h2 className="cookbook__header-title"> My Cookbook</h2>
      </article >
      <form className="recipe-search__form">
        <input
          type="text"
          className={`recipe-search__input ${searchState === "active" ? "recipe-search__input--active" : ""
            }`}
          placeholder="Search recipe name..."
          value={searchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleSearch}
        />
      </form>
      <Link to="/cookbook/add-recipe">
        <button className="cookbook__button">
          <AddIcon className="cookbook__button-icon" />
          Add recipe
        </button>
      </Link>
      {loading ? ( // Show loading spinner while loading
            <div className="cookbook__loading-container">
                <ClipLoader color="#3E5B62" loading={loading} size={100} /> {/* React Spinners */}
            </div>
        ) : (
            <>
                {error && (
                    <div className="cookbook__error-container">
                        <BowlIcon className="cookbook__error-icon" />
                        <h3 className="cookbook__error-message">{error}</h3>
                    </div>
                )}
                <CookbookRecipeCard recipes={filteredRecipes} basePath="/cookbook" />
            </>
        )}
    </section>
  )
}
