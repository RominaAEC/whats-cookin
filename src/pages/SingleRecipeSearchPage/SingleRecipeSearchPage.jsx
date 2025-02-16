import "./SingleRecipeSearchPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import BackIcon from "../../assets/icons/arrow-back.svg?react";

export default function SingleRecipeSearchPage() {
    const [recipe, setRecipe] = useState(null); // Store single recipe data
    const { recipeId } = useParams();

    const getRecipeById = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
            console.log(response.data);
            setRecipe(response.data); // Set the recipe data directly
        } catch (error) {
            console.error("Error fetching recipe", error);
        }
    };

    useEffect(() => {
        if (recipeId !== undefined) {
            getRecipeById(recipeId);
        }
    }, [recipeId]);

    return (
        <section className="single-recipe">
          {recipe && (
            <article className="single-recipe__container">
                <div className="single-recipe__navbar">
                        <Link to="/search-results">
                                <button className="single-recipe__navbar-button">
                                    <BackIcon className="single-recipe__navbar-icon" />
                                </button>
                            </Link>
                      <article className="single-recipe__navbar-button-container">
                            <Link to="/">
                                <button className="single-recipe__navbar-button">
                                    <SearchIcon className="single-recipe__navbar-icon" />
                                </button>
                            </Link>
                            <Link to="/cookbook">
                                <button className="single-recipe__navbar-button">
                                    <BookIcon className="single-recipe__navbar-icon" />
                                </button>
                            </Link>
                            </article>
                    </div>
               <div className="single-recipe__image-container">
            <img className="single-recipe__image" src={recipe.image} alt={recipe.name} />
            <div className="single-recipe__image-overlay"></div>
          </div>
            <p>{recipe.name}</p> 
            </article>
          )}
        </section>
    );
}
