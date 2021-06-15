const recipeContainer = document.querySelector(".recipe");

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

const renderSpinner = function (parentEl) {
    const markup = `
    <div class="spinner">
        <i class="fas fa-circle-notch"></i>
    </div>`;

    parentEl.innerHTML = "";
    parentEl.insertAdjacentHtml("afterend", markup);
};

const showRecipe = async function () {
    try {
        const res = await fetch(
            "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
        );
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        console.log(res, data);
    } catch (error) {
        alert(error);
    }
};

showRecipe();
