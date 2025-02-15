import "./SearchRecipeCard.scss";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";


export default function SearchRecipeCard() {

    const [recipes, setRecipes] = useState([]) //store recipes data

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
    <ul className="result-recipe">
        {recipes.map((recipe) => (
            <li
                key={recipe.id}
                className="result-recipe__container"
            >
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
            </li>
        )
    )}
        
    </ul>
  )
}
