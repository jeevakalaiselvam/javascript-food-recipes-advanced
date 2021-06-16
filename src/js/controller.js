import * as model from "./model.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

const controlRecipe = async function () {
    let id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    try {
        //1.Loading recipe
        await model.loadRecipe(id);

        //2.Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        const query = searchView.getQuery();
        await model.loadSearchResults(query);
    } catch (error) {
        console.error(error, "💥");
    }
};

const init = function () {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
};

init();
