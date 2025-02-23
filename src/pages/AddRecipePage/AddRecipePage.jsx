import "./AddRecipePage.scss";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export default function AddRecipePage() {

  // Define the initial form data
  const initialFormData = {
    name: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    ingredients: ["", "", ""], // Start with three empty ingredients
    instructions: ["", "", ""], // Start with three empty instructions
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();
  const redirectRoute = "/cookbook";

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
      const response = await axios.post('http://localhost:8080/recipes', recipeData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      // console.log("Recipe added successfully:", response.data);

      setFormData(initialFormData); // Reset the form data to initial values
      // Redirect to the /cookbook route
      navigate(redirectRoute);

    } catch (error) {
      console.error("Error adding recipe:", error)
    }
  };

  return (
    <section className="add-recipe">
      <article className="add-recipe__header">
        <Link to="/cookbook" className="add-recipe__button">
          <BackIcon className="add-recipe__icon" />
        </Link>
        <h2>Add a new recipe</h2>
      </article>
      <RecipeForm
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        onCancel={redirectRoute}
        formLabel="Add recipe"
        validation={validation}
        setValidation={setValidation}
      />
    </section>
  )
}
