import "./AddRecipePage.scss";
import AddRecipe from "../../components/AddRecipe/AddRecipe";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export default function AddRecipePage() {

  const initialFormData = {
    name: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    ingredients: ["", "", ""], // Start with one empty ingredient
    instructions: ["", "", ""], // Start with one empty instruction
  };

  const [formData, setFormData] = useState(initialFormData); 

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

    try{
      const response = await axios.post('http://localhost:8080/recipes', recipeData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log("Recipe added successfully:", response.data);
      // Reset the form data to initial values
      setFormData(initialFormData);
    }catch (error){
      console.error("Error adding recipe:", error)
    }
  };

  return (
    <section className="add-recipe">
      <article className="add-recipe__header">
        <Link to="/cookbook" className="add-recipe__button">
          <BackIcon className="add-recipe__icon"/>
        </Link>
        <h2>Add a new recipe</h2>
      </article>
      <AddRecipe
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </section>
  )
}
