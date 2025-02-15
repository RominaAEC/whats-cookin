import "./RecipeSearchPage.scss";
import SearchByIngredients from "../../components/SearchByIngredients/SearchByIngredients";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";

export default function RecipeSearchPage() {
  return (
    <section className="recipe-search"> 
      <SearchByIngredients className="recipe-search__search" />
      <SearchRecipeCard/>
    </section>
  )
}
