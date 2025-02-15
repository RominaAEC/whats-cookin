import "./HomePage.scss"; 
import PotIcon from "../../assets/icons/arcticons_rakuten-recipe.svg"
import SearchByIngredients from "../../components/SearchByIngredients/SearchByIngredients";

export default function HomePage() {
  return (
    <section className="home">
      <img className="home__image" src={PotIcon} alt="cooking pot icon"/>
      <h1 className="home">Got ingredients? Let's cook up something tasty!</h1>
      <SearchByIngredients/>
    </section>
  )
};


