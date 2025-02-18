import "./CookbookPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookIcon from "../../assets/icons/book.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";

export default function CookbookPage() {
  const [recipes, setRecipes] = useState([]); // State to store recipes data

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipes')
      // console.log(response.data);
      setRecipes(response.data);
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      <Link to="/cookbook/add-recipe">
        <button className="cookbook__button">
          <AddIcon className="cookbook__button-icon" />
          Add recipe
        </button>
      </Link>
      <SearchRecipeCard recipes={recipes} basePath="/cookbook" />
    </section>
  )
}
