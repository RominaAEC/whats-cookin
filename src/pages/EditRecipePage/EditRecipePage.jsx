import "./EditRecipePage.scss";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export default function EditRecipePage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const redirectRoute = `/cookbook/${recipeId}`;

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
  const [validation, setValidation] = useState({});  // Stores error messages/states related to the form fields 

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

  const validateForm = () => {
    const missingField = {};

    if (!formData.name.trim()) {
      missingField.name = "Recipe name is required"
    }

    if (!formData.prepTimeMinutes.trim()) {
      missingField.prepTimeMinutes = "Prep Time is required"
    } else if (isNaN(formData.prepTimeMinutes)) {
      missingField.prepTimeMinutes = "Prep Time must be a number";
    }

    if (!formData.cookTimeMinutes.trim()) {
      missingField.cookTimeMinutes = "Cook Time is required"
    } else if (isNaN(formData.cookTimeMinutes)) {
      missingField.cookTimeMinutes = "Cook Time must be a number";
    }

    if (!formData.servings.trim()) {
      missingField.servings = "Servings is required"
    } else if (isNaN(formData.servings)) {
      missingField.servings = "Servings must be a number";
    }

    const ingredientsValidation = formData.ingredients.map((ingredient, index) =>
      !ingredient.trim() ? `Ingredient ${index + 1} is missing` : null
    );
    if (ingredientsValidation.some((error) => error !== null)) {
      missingField.ingredients = ingredientsValidation;
    }

    const instructionValidation = formData.instructions.map((instruction, index) =>
      !instruction.trim() ? `Instruction ${index + 1} is missing` : null
    );
    if (instructionValidation.some((error) => error !== null)) {
      missingField.instructions = instructionValidation;
    }

    setValidation(missingField);
    return Object.keys(missingField).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const recipeData = {
      name: formData.name,
      prepTimeMinutes: (formData.prepTimeMinutes),
      cookTimeMinutes: (formData.cookTimeMinutes),
      servings: (formData.servings),
      ingredients: formData.ingredients.filter((ingredient) => ingredient.trim() !== ""),
      instructions: formData.instructions.filter((instruction) => instruction.trim() !== ""),
    };

    try {
      const response = await axios.put(`http://localhost:8080/recipes/${recipeId}`, recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Recipe updated successfully:", response.data);

      navigate(redirectRoute); // Redirect to the /cookbook route
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  }

  return (
    <section className="edit-recipe">
      <article className="edit-recipe__header">
        <Link to={redirectRoute}>
          <button className="edit-recipe__button">
            <BackIcon className="edit-recipe__icon" />
          </button>
        </Link>
        <h2>Edit recipe</h2>
      </article>
      <RecipeForm
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        onCancel={redirectRoute}
        formLabel="Save changes"
        validation={validation}
        setValidation={setValidation}
      />
    </section>
  )
}
