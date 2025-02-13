# Project Title
What’s Cookin’

## Overview

What's Cookin' is designed to help users decide what to cook based on the ingredients they already have in their pantry. Users can input their pantry items and receive recipe suggestions, while also adding their favorite recipes to a personal cookbook wheter that is creating their own recipe or adding one from the suggested ones. 

### Problem

People often find themselves staring at their fridge or pantry without knowing what to cook. They may forget about their own recipes or struggle to come up with meal ideas based on limited ingredients. What’s Cookin’ helps them by providing instant recipe suggestions, and giving users a list of dishes they can make with what they already have. The app also serves as a digital cookbook where users can add recipes from the suggestions or add their own. What's Cookin aims to solve the common issue of not knowing what to cook, while also allowing users to save and manage their favorite meals.

### User Profile

- Who will use it: 
    - Home cooks 
    - Busy professionals 
    - Students
    - Anyone who struggles to decide what to cook or wants to organize their recipes.
- How will they use it: 
    - Users will input ingredients they currently have in their pantry
	- Users will receive a list of recipe options based on those ingredients
	- Users will add their favorite recipes to their personal cookbook
	- Users may also add their own custom recipes

### Features

1. Input Pantry Items:

As a user, I want to be able to input the ingredients I have in my pantry so that I can get recipe suggestions based on what I already have available.

2. Recipe Suggestions:

As a user, I want the app to provide me with a list of recipes that I can make using the ingredients I’ve entered so that I can quickly find meal options without having to search through countless recipes.

3. Add Custom Recipes:

As a user, I want to be able to add my own recipes to my cookbook, so that I can store all my favorite dishes in one place and have them available for future use.

4. Recipe Search:

As a user, I want to be able to search for recipes in my cookbook, so that I can quickly find the recipe I want without scrolling through all of them.

5. Manage Recipes: 
As a user, I want to be able to save recipes that I like to my personal cookbook so that I can easily access and make them again in the future.

As a user, I want to be able to add my own recipes to my cookbook, so that I can store all my favorite dishes in one place and have them available for future use.

As a user, I want to be able to edit or delete recipes from my personal cookbook. 

## Implementation

### Tech Stack

- React
- Client libraries: 
    - react
    - react-router
    - react-modal
    - axios
- Server libraries:
    - express

### APIs

- https://dummyjson.com/docs/recipes

### Sitemap

- Homepage: A simple dashboard to input pantry ingredients and view suggested recipes.
- Individual recipe page: A detailed view of the recipe that includes ingredients and  
- cookbook: Page to view saved recipes.
- Add Recipe: Interface to allow users to add their own recipes.
- Edit Recipe: Interface to allow users to edit recipes from their recipe book

### Mockups
- https://www.figma.com/design/3VwSbBeuNw8PWR3Zhv0Icu/Mockups?node-id=0-1&t=mh9XjD3I5FBM5TgJ-1
### Data

A JSON file will be used for the cookbook API in the first MVP, and later as more features are implemented a database will be required. 

### Endpoints
#### JSON file for user's personal  cookbook

**GET /recipes**
- Returns a list of all recipes.

Response:
```
[
    {
        "id": 1,
        "name": "Margherita Pizza",
        "ingredients": [
                "Pizza dough",
                "Tomato sauce",
                "Fresh mozzarella cheese",
                "Fresh basil leaves",
                "Olive oil",
                "Salt and pepper to taste"
            ],
        "instructions": [
                "Preheat the oven to 475°F (245°C).",
                "Roll out the pizza dough and spread tomato sauce evenly.",
                "Top with slices of fresh mozzarella and fresh basil leaves.",
                "Drizzle with olive oil and season with salt and pepper.",
                "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
                "Slice and serve hot."
            ],
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
    },
]
```

**GET /recipes/:id**
- Retrieves a single recipe by its unique ID.

Parameters:
- id: Recipe ID as a number.

**POST /recipes**
- Allows the user to submit a new recipe to the database.

Parameters:
- name: Name of the recipe.
- ingredients: List of ingredients as an array of strings.
- instructions: Instructions for preparing the recipe.
- prep_time: Preparation time in minutes.
- cook_time: Cooking time in minutes.
- servings: Number of servings the recipe makes.


**PUT /recipes/:id**
- Allows the user to update a recipe by its ID.

Parameters:
- id: Recipe ID to be updated.
- name (optional): Updated name of the recipe.
- ingredients (optional): Updated list of ingredients.
- instructions (optional): Updated instructions.
- prepTimeMinutes (optional): Updated preparation time.
- cookTimeMinutes (optional): Updated cooking time.
- servings (optional): Updated number of servings.

Response:
```
[
    {
        "id": 1,
        "name": "Margherita Pizza",
        "ingredients": [
                "Pizza dough",
                "Tomato sauce",
                "Fresh mozzarella cheese",
                "Fresh basil leaves",
                "Olive oil",
                "Salt and pepper to taste"
            ],
        "instructions": [
                "Preheat the oven to 475°F (245°C).",
                "Roll out the pizza dough and spread tomato sauce evenly.",
                "Top with slices of fresh mozzarella and fresh basil leaves.",
                "Drizzle with olive oil and season with salt and pepper.",
                "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
                "Slice and serve hot."
            ],
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
    },
]
```
**DELETE /recipes/:id**
- Deletes a recipe from the API by its ID.

Parameters:
- id: Recipe ID to be deleted.


## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder

- Gather recipes for users' personal recipe book

- Create UI elements with hardcoded values for styling   
	- Navigation bar
	- Home page
		- Feature: search recipes by ingredients will display suggested recipes
		- Feature: save a recipe in the personal cookbook
	- cookbook page 
		- Feature: View a list of personal recipes or recipes added from the suggested recipes
		- Feature: Delete a recipe from the cookbook. 
	- Add cookbook 
		- Feature: Add a new recipe to the cookbook
	- Edit cookbook 
		- Feature: Edit a recipe for the cookbook

- Create backend APIs for personal cookbook. 
	- GET
	- POST
	- PUT 
	- DELETE

- Connect back-end to front-end 

- Make API's call (front-end) to third party (for initial searched recipes) 

- Bug fixes

- DEMO DAY

## Future Implementations

- User Authentication: Ability to create accounts, log in, and save recipes across devices.
- Filter recipes according to meal type (dinner, lunch, breakfast) and diet (vegan, vegetarian, etc.)
- Add list and grid view preferences. 
- Meal Planning: Users can create a meal plan for the week based on their pantry.
