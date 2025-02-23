import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss'
import HomePage from "./pages/HomePage/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage/RecipeSearchPage";
import SingleRecipeSearchPage from "./pages/SingleRecipeSearchPage/SingleRecipeSearchPage";
import CookbookPage from "./pages/CookbookPage/CookbookPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import CookbookSingleRecipePage from "./pages/CookbookSingleRecipePage/CookbookSingleRecipePage";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
          <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/search-results" element={<RecipeSearchPage/>}/>
          <Route path="/search-results/:recipeId" element={<SingleRecipeSearchPage/>}/>
          <Route path="/cookbook" element={<CookbookPage/>}/>
          <Route path="/cookbook/add-recipe" element={<AddRecipePage/>}/>
          <Route path="/cookbook/:recipeId" element={<CookbookSingleRecipePage/>}/>
          <Route path="/cookbook/:recipeId/edit" element={<EditRecipePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
