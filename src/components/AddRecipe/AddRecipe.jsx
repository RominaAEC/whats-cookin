import "./AddRecipe.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";

export default function AddRecipe({ onSubmit }) {
    const [ingredients, setIngredients] = useState(["", "", ""]); // Default 3 inputs
    const [instructions, setInstructions] = useState(["", "", ""]);
    const [focusedInput, setFocusedInput] = useState(null);

    const addIngredient = () => setIngredients([...ingredients, ""]);
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const addInstruction = () => setInstructions([...instructions, ""]);
    const removeInstruction = (index) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    // Function to update ingredient value
    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    // Function to update instruction value
    const handleInstructionChange = (index, value) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        setInstructions(updatedInstructions);
    };

    // Handle focus and blur events
    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    return (
        <form onSubmit={onSubmit} className="recipe-form">
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Recipe Name</label>
                <input
                    type="text"
                    placeholder="Recipe name"
                    className={`recipe-form__input ${focusedInput === "recipeName" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("recipeName")}
                    onBlur={handleBlur} />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Prep Time</label>
                <input
                    type="text"
                    placeholder="Prep time"
                    className={`recipe-form__input ${focusedInput === "prepTime" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("prepTime")}
                    onBlur={handleBlur} />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Cook Time</label>
                <input
                    type="text"
                    placeholder="Cook time"
                    className={`recipe-form__input ${focusedInput === "cookTime" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("cookTime")}
                    onBlur={handleBlur} />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Servings</label>
                <input
                    type="text"
                    placeholder="Servings"
                    className={`recipe-form__input ${focusedInput === "servings" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("servings")}
                    onBlur={handleBlur} />
            </div>

            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Ingredients</label>
                <div className="recipe-form__input-container">
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="recipe-form__input-group">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                placeholder={`Ingredient ${index + 1}`}
                                className={`recipe-form__input ${focusedInput === `ingredient-${index}` ? "recipe-form__input--active" : ""}`}
                                onFocus={() => handleFocus(`ingredient-${index}`)}
                                onBlur={handleBlur}
                            />
                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="recipe-form__button-small"
                                >
                                    <DeleteIcon className="recipe-form__icon" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="recipe-form__button recipe-form__button--add">
                        <AddIcon className="recipe-form__icon" />
                        Add more ingredients
                    </button>
                </div>
            </div>

            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Instructions</label>

                <div className="recipe-form__input-container">
                    {instructions.map((instruction, index) => (
                        <div key={index} className="recipe-form__input-group">
                            <input
                                type="text"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                placeholder={`Instruction ${index + 1}`}
                                className={`recipe-form__input ${focusedInput === `instruction-${index}` ? "recipe-form__input--active" : ""}`}
                                onFocus={() => handleFocus(`instruction-${index}`)}
                                onBlur={handleBlur}
                            />
                            {instructions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className="recipe-form__button-small"
                                >
                                    <DeleteIcon className="recipe-form__icon" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction} className="recipe-form__button recipe-form__button--add">
                        <AddIcon className="recipe-form__icon" />
                        Add more instructions
                    </button>
                </div>
            </div>
            <div className="recipe-form__action-buttons">
                <Link to="/cookbook" className="recipe-form__button recipe-form__button--cancel">
                    Cancel
                </Link>

                <button type="submit" className="recipe-form__button recipe-form__button--submit">
                    Add recipe
                </button>
            </div>
        </form>
    );
}

