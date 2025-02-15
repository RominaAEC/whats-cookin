import "./NavBar.scss";
import Logo from "../../assets/icons/logo.svg";
import SearchIcon from "../../assets/icons/search.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function NavBar() {
    const location = useLocation();

    // State to keep track of window width
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    // Watch for window resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 767);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    // Regex to match specific routes like /search-results/:id and /cookbook/:id
    const isSpecialPage = /^\/search-results\/[^/]+$/.test(location.pathname) || /^\/cookbook\/[^/]+$/.test(location.pathname);
  
    // Conditionally add 'navbar--hide' class for mobile special pages
    const navbarClass = isSpecialPage && isMobile ? "navbar navbar--hide" : "navbar";

    return (
    <section className={navbarClass}>
      <img className="navbar__logo" src={Logo} alt="What's Cookin' logo"/>
      <article className="navbar__button-container">
        <button className="navbar__button">
            <SearchIcon className="navbar__button-icon" />
            <span className="navbar__button-label">Recipe finder</span>
        </button>
        <button className="navbar__button">
            <BookIcon className="navbar__button-icon" />
            <span  className="navbar__button-label">My cookbook</span>
        </button>
      </article>
    </section>
  )
}
