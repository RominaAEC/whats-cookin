import "./CookbookSingleRecipePage.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import CarrotIcon from "../../assets/icons/ph_carrot-thin.svg?react";
import BowlIcon from "../../assets/icons/arcticons_recipe-keeper.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";


export default function CookbookSingleRecipePage() {
    const [recipe, setRecipe] = useState(null); // Store single recipe data
    const { recipeId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const navigate = useNavigate();

    const getRecipeById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/recipes/${id}`);
            // console.log(response.data);
            setRecipe(response.data); // Set the recipe data directly
        } catch (error) {
            console.error("Error fetching recipe", error);
        }
    };

    useEffect(() => {
        if (recipeId !== undefined) {
            getRecipeById(recipeId);
        }
    }, [recipeId]);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const deleteRecipe = () => {
        if (selectedItem) {
            axios
                .delete(`http://localhost:8080/recipes/${selectedItem}`)
                .then(() => {
                    navigate(`/cookbook`);
                })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                    // alert("Failed to delete item.");
                })
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    const handleBack = () => {
        const previousPage = sessionStorage.getItem("previousPage");
    
        if (previousPage && previousPage.includes(`/cookbook/${recipeId}/edit`)) {
            navigate("/cookbook"); // If coming from edit, go to cookbook
        } else if (previousPage) {
            navigate(previousPage); // Go back to stored previous page
        } else {
            navigate(-1); // Default back behavior
        }
    };

    return (
        <section className="single-recipe">
            <DeleteModal
                modalTag={selectedItem ? recipe.name : ""}
                isOpen={isModalOpen}
                onClose={closeModal}
                onAction={deleteRecipe}
            />
            {recipe && (
                <article className="single-recipe__container">
                    <div className="single-recipe__navbar">
                        <button
                            className="single-recipe__navbar-button"
                            onClick={handleBack}>
                            <BackIcon className="single-recipe__navbar-icon" />
                        </button>
                        <article className="single-recipe__navbar-button-container">
                            <Link to="/">
                                <button className="single-recipe__navbar-button">
                                    <SearchIcon className="single-recipe__navbar-icon" />
                                </button>
                            </Link>
                            <Link to="/cookbook">
                                <button className="single-recipe__navbar-button">
                                    <BookIcon className="single-recipe__navbar-icon" />
                                </button>
                            </Link>
                        </article>
                    </div>
                    
                    <div className="single-recipe__image-container">
                        <img className="single-recipe__image" src={recipe.image} alt={recipe.name} />
                        <div className="single-recipe__image-overlay"></div>
                    </div>

                    <div className="single-recipe__card">
                        <div className="single-recipe__header">
                            <div className="single-recipe__title-container">
                                <h2 className="single-recipe__title">{recipe.name}</h2>
                            </div>
                            <div className="single-recipe__button-container">
                                <button onClick={() => openModal(recipe.id)} className="single-recipe__cookbook-button single-recipe__cookbook-button--delete">
                                    <DeleteIcon className="single-recipe__header-icon single-recipe__header-icon--delete" />
                                </button>
                                <Link to={`/cookbook/${recipe.id}/edit`}>
                                    <button className="single-recipe__cookbook-button single-recipe__cookbook-button--edit">
                                        <EditIcon className="single-recipe__header-icon single-recipe__header-icon--edit" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="single-recipe__ingredients-container">
                            <div className="single-recipe__ingredients">
                                <div className="single-recipe__ingredients-header">
                                    <CarrotIcon className="single-recipe__ingredients-icon" />
                                    <h3 className="single-recipe__ingredients-label">Ingredients</h3>
                                </div>
                                <ul className="single-recipe__list">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li className="single-recipe__list-item" key={index}><p>{ingredient}</p></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="single-recipe__time-container">
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Prep:</p>
                                    <p className="single-recipe__detail p1">{recipe.prepTimeMinutes} min</p>
                                </div>
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Cook:</p>
                                    <p className="single-recipe__detail p1">{recipe.cookTimeMinutes} min</p>
                                </div>
                                <div className="single-recipe__time">
                                    <p className="single-recipe__label p1">Servings:</p>
                                    <p className="single-recipe__detail p1">{recipe.servings}</p>
                                </div>
                            </div>
                        </div>

                        <div className="single-recipe__instructions-container">
                            <div className="single-recipe__ingredients-header">
                                <BowlIcon className="single-recipe__ingredients-icon" />
                                <h3 className="single-recipe__ingredients-label">Instructions</h3>
                            </div>
                            <ul className="single-recipe__list">
                                {recipe.instructions.map((instruction, index) => (
                                    <li className="single-recipe__list-item" key={index}><p>{instruction}</p></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            )}
        </section>
    );
}

