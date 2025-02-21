import "./SingleRecipeSearchPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import BookmarkIcon from "../../assets/icons/bookmark.svg?react";
import CarrotIcon from "../../assets/icons/ph_carrot-thin.svg?react";
import BowlIcon from "../../assets/icons/arcticons_recipe-keeper.svg?react";

export default function SingleRecipeSearchPage() {
    const [recipe, setRecipe] = useState(null); // Store single recipe data
    const [recipeSaved, setRecipeSaved] = useState(false);
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const getRecipeById = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
            // console.log(response.data);
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

    const handleSave = async () => {
        if (!recipe || recipeSaved) return; // Ensure there's a recipe to save

        try {
            const response = await axios.post("http://localhost:8080/recipes", {
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                prepTimeMinutes: recipe.prepTimeMinutes,
                cookTimeMinutes: recipe.cookTimeMinutes,
                servings: recipe.servings,
                image: recipe.image
            }, 
            { headers: { "Content-Type": "application/json" } });

            if (response.status === 201) {
                // console.log("Recipe bookmarked successfully:", response.data);
                setRecipeSaved(true);
            }
        } catch (error) {
            console.error("Error bookmarking recipe:", error);
        }
    }

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <section className="single-recipe">
            {recipe && (
                <article className="single-recipe__container">
                    <div className="single-recipe__navbar">
                        <button
                            className="single-recipe__navbar-button"
                            onClick={handleBack}>
                            <BackIcon className="single-recipe__navbar-icon" />
                        </button>
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
                    <div className="single-recipe__card">
                        <div className="single-recipe__header">
                            <div className="single-recipe__title-container">
                                <h2 className="single-recipe__title">{recipe.name}</h2>
                            </div>
                            <button
                                className={`single-recipe__header-button ${recipeSaved ? "single-recipe__header-button--active" : ""}`}
                                onClick={handleSave}>
                                <BookmarkIcon
                                    className={`single-recipe__icon-save ${recipeSaved ? "single-recipe__icon-save--active" : ""}`} />
                            </button>
                        </div>
                        <div className="single-recipe__ingredients-container">
                            <div className="single-recipe__ingredients">
                                <div className="single-recipe__ingredients-header">
                                    <CarrotIcon className="single-recipe__ingredients-icon" />
                                    <h3 className="single-recipe__ingredients-label">Ingredients</h3>
                                </div>
                                <ul className="single-recipe__list">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li className="single-recipe__list-item" key={index}><p>{ingredient}</p></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="single-recipe__time-container">
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Prep:</p>
                                    <p className="single-recipe__detail p1">{recipe.prepTimeMinutes} min</p>
                                </div>
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Cook:</p>
                                    <p className="single-recipe__detail p1">{recipe.cookTimeMinutes} min</p>
                                </div>
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Servings:</p>
                                    <p className="single-recipe__detail p1">{recipe.servings}</p>
                                </div>
                            </div>
                        </div>
                        <div className="single-recipe__instructions-container">
                            <div className="single-recipe__ingredients-header">
                                <BowlIcon className="single-recipe__ingredients-icon" />
                                <h3 className="single-recipe__ingredients-label">Instructions</h3>
                            </div>
                            <ul className="single-recipe__list">
                                {recipe.instructions.map((instruction, index) => (
                                    <li className="single-recipe__list-item" key={index}><p>{instruction}</p></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            )}
        </section>
    );
}
