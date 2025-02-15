import "./HomePage.scss"; 
import PotIcon from "../../assets/icons/arcticons_rakuten-recipe.svg"
import SearchByIngredients from "../../components/SearchByIngredients/SearchByIngredients";

export default function HomePage() {
  return (
    <section className="home">
      <article className="home__container">
        <img className="home__image" src={PotIcon} alt="cooking pot icon"/>
      <h1 className="home__title">Got ingredients? <br/>Let's make something tasty!</h1>
      <SearchByIngredients className="home__search"/>
      </article>
      
    </section>
  )
};


