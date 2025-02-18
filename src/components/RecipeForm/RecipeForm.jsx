import "./RecipeForm.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";

export default function AddRecipe({ onSubmit, formData, setFormData, onCancel, formLabel}) {
    const [focusedInput, setFocusedInput] = useState(null);

    // Update a specific field in formData
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Add or remove ingredients
    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ""],
        }));
    };

    const removeIngredient = (index) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };

    // Add or remove instructions
    const addInstruction = () => {
        setFormData((prev) => ({
            ...prev,
            instructions: [...prev.instructions, ""],
        }));
    };

    const removeInstruction = (index) => {
        setFormData((prev) => ({
            ...prev,
            instructions: prev.instructions.filter((_, i) => i !== index),
        }));
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
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)} 
                    className={`recipe-form__input ${focusedInput === "name" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Prep Time</label>
                <input
                    type="text"
                    placeholder="Prep time"
                    value={formData.prepTimeMinutes}
                    onChange={(e) => handleChange("prepTimeMinutes", e.target.value)}
                    className={`recipe-form__input ${focusedInput === "prepTimeMinutes" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("prepTimeMinutes")}
                    onBlur={handleBlur} />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Cook Time</label>
                <input
                    type="text"
                    placeholder="Cook time"
                    value={formData.cookTimeMinutes}
                    onChange={(e) => handleChange("cookTimeMinutes", e.target.value)}
                    className={`recipe-form__input ${focusedInput === "cookTimeMinutes" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("cookTimeMinutes")}
                    onBlur={handleBlur} />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Servings</label>
                <input
                    type="text"
                    placeholder="Servings"
                    value={formData.servings}
                    onChange={(e) => handleChange("servings", e.target.value)}
                    className={`recipe-form__input ${focusedInput === "servings" ? "recipe-form__input--active" : ""}`}
                    onFocus={() => handleFocus("servings")}
                    onBlur={handleBlur} />
            </div>

            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Ingredients</label>
                <div className="recipe-form__input-container">
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="recipe-form__input-group">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => {
                                    const updatedIngredients = [...formData.ingredients];
                                    updatedIngredients[index] = e.target.value;
                                    handleChange("ingredients", updatedIngredients);
                                }}
                                placeholder={`Ingredient ${index + 1}`}
                                className={`recipe-form__input ${focusedInput === `ingredient-${index}` ? "recipe-form__input--active" : ""}`}
                                onFocus={() => handleFocus(`ingredient-${index}`)}
                                onBlur={handleBlur}
                            />
                            {formData.ingredients.length > 1 && (
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
                    {formData.instructions.map((instruction, index) => (
                        <div key={index} className="recipe-form__input-group">
                            <input
                                type="text"
                                value={instruction}
                                onChange={(e) => {
                                    const updatedInstructions = [...formData.instructions];
                                    updatedInstructions[index] = e.target.value;
                                    handleChange("instructions", updatedInstructions);
                                }}
                                placeholder={`Instruction ${index + 1}`}
                                className={`recipe-form__input ${focusedInput === `instruction-${index}` ? "recipe-form__input--active" : ""}`}
                                onFocus={() => handleFocus(`instruction-${index}`)}
                                onBlur={handleBlur}
                            />
                            {formData.instructions.length > 1 && (
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
                <Link to={onCancel} className="recipe-form__button recipe-form__button--cancel">
                    Cancel
                </Link>

                <button type="submit" className="recipe-form__button recipe-form__button--submit">
                    {formLabel}
                </button>
            </div>
        </form>
    );
}

