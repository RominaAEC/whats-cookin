import "./CookbookRecipeCard.scss";
import { Link } from "react-router-dom";

export default function SearchRecipeCard({ recipes, basePath }) {
    return (
        <ul className="cookbook-recipe">
            {recipes.map((recipe, index) => (
                <li
                    key={index}
                    className="cookbook-recipe__container"
                >
                    <Link
                        to={`${basePath}/${recipe.id}`}
                        onClick={() => sessionStorage.setItem("previousPage", window.location.pathname + window.location.search)}>
                        <img className="cookbook-recipe__image" src={recipe.image} alt={recipe.name} />
                        <div className="cookbook-recipe__wrapper">
                            <h4 className="cookbook-recipe__title">{recipe.name}</h4>
                            <div className="cookbook-recipe__details">
                                <p className="cookbook-recipe__label p1">Prep Time:</p>
                                <p className="cookbook-recipe__content p1">{`${recipe.prepTimeMinutes} min`}</p>
                            </div>
                            <div className="cookbook-recipe__details">
                                <p className="cookbook-recipe__label p1">Cook Time:</p>
                                <p className="cookbook-recipe__content p1">{`${recipe.cookTimeMinutes} min`}</p>
                            </div>
                            <div className="cookbook-recipe__details">
                                <p className="cookbook-recipe__label p1">Servings:</p>
                                <p className="cookbook-recipe__content p1">{recipe.servings}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            )
            )}
        </ul>
    )
}