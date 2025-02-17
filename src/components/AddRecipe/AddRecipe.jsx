import "./AddRecipe.scss";
import { useState } from "react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";

export default function AddRecipe({ onSubmit }) {
    const [ingredients, setIngredients] = useState(["", "", ""]); // Default 3 inputs
    const [instructions, setInstructions] = useState(["", "", ""]);

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

    return (
        <form onSubmit={onSubmit} className="recipe-form">
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Recipe Name</label>
                <input type="text" placeholder="Recipe name" className="recipe-form__input" />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Prep Time</label>
                <input type="number" placeholder="Prep time" className="recipe-form__input" />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Cook Time</label>
                <input type="number" placeholder="Cook time" className="recipe-form__input" />
            </div>
            <div className="recipe-form__wrapper">
                <label className="recipe-form__label">Servings</label>
                <input type="number" placeholder="Servings" className="recipe-form__input" />
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
                                className="recipe-form__input"
                            />
                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="recipe-form__button-small"
                                >
                                    <DeleteIcon className="recipe-form__icon"/>
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="recipe-form__button">
                        <AddIcon className="recipe-form__icon"/>
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
                                className="recipe-form__input"
                            />
                            {instructions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className="recipe-form__button-small"
                                >
                                    <DeleteIcon className="recipe-form__icon"/>
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction} className="recipe-form__button">
                        <AddIcon className="recipe-form__icon"/>
                    </button>
                </div>
            </div>
            <div>
                <button type="button" className="recipe-form__button recipe-form__button--cancel">
                    Cancel
                </button>

                <button type="submit" className="recipe-form__button recipe-form__button--submit">
                    Add Recipe
                </button>
            </div>

        </form>
    );
}

