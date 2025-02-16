import "./SingleRecipeSearchPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleRecipeSearchPage() {
    const [recipe, setRecipe] = useState(null); // Store single recipe data
    const { recipeId } = useParams();
    console.log("this is the id", recipeId);

    const getRecipeById = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
            console.log('hello');
            setRecipe(response.data); // Set the recipe data directly
        } catch (error) {
            console.error("Error fetching recipe", error);
        }
    };

    useEffect(() => {
      console.log("useEffect triggered, recipeId:", recipeId); // Debugging
        if (recipeId !== undefined) {
            getRecipeById(recipeId);
        }
    }, [recipeId]);

    return (
        <section className="single-recipe">
          {recipe.name}
        </section>
    );
}
