import "./EditRecipePage.scss";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export default function EditRecipePage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // Define the initial form data
  const initialFormData = {
    name: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    ingredients: [],
    instructions: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const getRecipeById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/${recipeId}`);
        const recipe = response.data

        setFormData({
          name: recipe.name,
          prepTimeMinutes: recipe.prepTimeMinutes.toString(),
          cookTimeMinutes: recipe.cookTimeMinutes.toString(),
          servings: recipe.servings.toString(),
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        })

      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }

    getRecipeById();
  }, [recipeId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      name: formData.name,
      prepTimeMinutes: parseInt(formData.prepTimeMinutes, 10),
      cookTimeMinutes: parseInt(formData.cookTimeMinutes, 10),
      servings: parseInt(formData.servings, 10),
      ingredients: formData.ingredients.filter((ingredient) => ingredient.trim() !== ""),
      instructions: formData.instructions.filter((instruction) => instruction.trim() !== ""),
    };

    try {
      const response = await axios.put(`http://localhost:8080/recipes/${recipeId}`, recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Recipe updated successfully:", response.data);
      // Redirect to the /cookbook route
      navigate("/cookbook");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  }

  return (
    <section className="edit-recipe">
      <article className="edit-recipe__header">
        <Link to="/cookbook" className="edit-recipe__button">
          <BackIcon className="edit-recipe__icon" />
        </Link>
        <h2>Edit recipe</h2>
      </article>
      <RecipeForm
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  )
}
