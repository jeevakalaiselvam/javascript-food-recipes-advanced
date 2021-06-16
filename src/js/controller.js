import * as model from "./model.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

//https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

///////////////////////////////////////

const showRecipe = async function () {
    let id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //1.Loading recipe
    await model.loadRecipe(id);

    //2.Rendering recipe
    recipeView.render(model.state.recipe);
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
