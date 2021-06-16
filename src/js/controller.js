import * as model from "./model.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

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
    resultsView.renderSpinner("5rem");
    try {
        const query = searchView.getQuery();

        //1.Loading search results
        await model.loadSearchResults(query);

        //2.Rendering search results
        resultsView.render(model.getSearchResultsPage());

        //3.Render pagination
        paginationView.render(model.state.search);
    } catch (error) {
        console.error(error, "💥");
    }
};

const controlPagination = function (number) {
    resultsView.render(model.getSearchResultsPage(number));
    paginationView.render(model.state.search);
};

const controlChangeServing = function (newServing) {
    model.updateServing(newServing);
    recipeView.render(model.state.recipe);
};

const init = function () {
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerChangeServings(controlChangeServing);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};

init();
