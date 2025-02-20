import "./CookbookRecipeCard.scss";
import { Link } from "react-router-dom";

export default function SearchRecipeCard({ recipes, basePath }) {
  return (
    <ul className="result-recipe">
        {recipes.map((recipe, index) => (
            <li
                key={index}
                className="result-recipe__container"
            >
                 <Link 
                 to={`${basePath}/${recipe.id}`}
                 onClick={() => sessionStorage.setItem("previousPage", window.location.pathname + window.location.search)}>
                <img className="result-recipe__image" src={recipe.image} alt={recipe.name}/>
                <div className="result-recipe__wrapper">
                    <h4 className="result-recipe__title">{recipe.name}</h4>
                    <div className="result-recipe__details">
                        <p className="result-recipe__label p1">Prep Time:</p>
                        <p className="result-recipe__content p1">{`${recipe.prepTimeMinutes} min`}</p>
                    </div>
                    <div className="result-recipe__details">
                        <p className="result-recipe__label p1">Cook Time:</p>
                        <p className="result-recipe__content p1">{`${recipe.cookTimeMinutes} min`}</p>
                    </div>
                    <div className="result-recipe__details">
                        <p className="result-recipe__label p1">Servings:</p>
                        <p className="result-recipe__content p1">{recipe.servings}</p>
                    </div>
                </div>
                </Link>
            </li>
        )
    )}  
    </ul>
  )
}