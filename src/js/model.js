import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: {},
    },
};

export const loadRecipe = async function (id) {
    try {
        //Get data from the internet
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data;

        //Add the recipe to state
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        const recipes = data.data.recipes;

        //Add the recipe search list to state
        state.search.results = recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });

        console.log("STATE", this.state);
    } catch (err) {
        throw err;
    }
};
