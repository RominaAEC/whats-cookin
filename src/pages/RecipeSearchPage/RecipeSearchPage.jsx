import "./RecipeSearchPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchByIngredients from "../../components/SearchByIngredients/SearchByIngredients";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";

export default function RecipeSearchPage() {
  const [recipes, setRecipes] = useState([]); // State to store recipes data

  const getRecipes = async () => {
    try{
        const response = await axios.get('https://dummyjson.com/recipes')
        console.log(response.data);
        setRecipes(response.data.recipes);
    } catch(error){
        console.error("Error fetching recipes", error);
    }
}

useEffect(() => {
    getRecipes();
}, []);

  return (
    <section className="recipe-search"> 
      <SearchByIngredients className="recipe-search__search" />
      <SearchRecipeCard recipes={recipes} basePath="/search-results"/>
    </section>
  )
}
