import "./NavBar.scss";
import Logo from "../../assets/icons/logo.svg";
import SearchIcon from "../../assets/icons/search.svg?react";
import BookIcon from "../../assets/icons/book.svg?react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function NavBar() {
    const location = useLocation();
    const pathname = location.pathname;

    const isSearchActive = pathname === "/" || pathname.startsWith("/search-results");
    const isCookbookActive = pathname.startsWith("/cookbook");

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

    // Regex to match specific routes /search-results/:recipeId and /cookbook/:recipeId
    const isSpecialPage =
        /^\/search-results\/[^/]+$/.test(pathname) ||
        /^\/cookbook\/\d+$/.test(pathname);

    // Conditionally add 'navbar--hide' class for mobile special pages
    const navbarClass = isSpecialPage && isMobile ? "navbar navbar--hide" : "navbar";

    return (
        <section className={navbarClass}>
            <Link className="navbar__logo-container" to="/">
                <img className="navbar__logo" src={Logo} alt="What's Cookin' logo" />
            </Link>

            <article className="navbar__button-container">
                <Link to="/">
                    <button className={`navbar__button ${isSearchActive ? "navbar__button--active" : ""}`}>
                        <SearchIcon className="navbar__button-icon" />
                        <span className="navbar__button-label">Recipe finder</span>
                    </button>
                </Link>
                <Link to="/cookbook">
                    <button className={`navbar__button ${isCookbookActive ? "navbar__button--active" : ""}`}>
                        <BookIcon className="navbar__button-icon" />
                        <span className="navbar__button-label">My cookbook</span>
                    </button>
                </Link>

            </article>
        </section>
    )
}
