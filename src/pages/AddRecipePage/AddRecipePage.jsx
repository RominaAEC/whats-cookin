import "./AddRecipePage.scss";
import AddRecipe from "../../components/AddRecipe/AddRecipe";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Link } from "react-router-dom";

export default function AddRecipePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Ingredients:", ingredients);
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
      />
    </section>
  )
}
