import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";
import View from "./View.js";

class RecipeView extends View {
    _parentElement = document.querySelector(".recipe");
    _errorMessage = "We couldnot find that recipe, Please try another one!";
    _message = "Success!";

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((ev) =>
            window.addEventListener(ev, handler)
        );
    }

    addHandlerChangeServings(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const button = e.target.closest(".btn--update-servings");
            if (!button) return;
            if (+button.dataset.updateServing > 0)
                handler(+button.dataset.updateServing);
        });
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--round");
            if (!btn) return;
            handler();
        });
    }

    //Update only the data needed
    //NOTE - Performance implications on complex projects
    update(data) {
        console.log(data);
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(
            this._parentElement.querySelectorAll("*")
        );

        newElements.forEach((newEl, i) => {
            const curEL = curElements[i];

            //Update changed text
            if (
                !newEl.isEqualNode(curEL) &&
                newEl.firstChild?.nodeValue.trim() !== ""
            ) {
                curEL.textContent = newEl.textContent;
            }

            //Update changes attributes
            if (!newEl.isEqualNode(curEL)) {
                Array.from(newEl.attributes).forEach((attr) =>
                    curEL.setAttribute(attr.name, attr.value)
                );
            }
        });
    }

    _generateMarkup() {
        return `
        <figure class="recipe__fig">
            <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
                <button class="btn--tiny btn--update-servings" data-update-serving="${
                    this._data.servings - 1
                }">
                <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                </svg>
                </button>
                <button class="btn--tiny btn--update-servings" data-update-serving="${
                    this._data.servings + 1
                }">
                <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                </svg>
                </button>
            </div>
            </div>

            <div class="recipe__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
            <button class="btn--round">
            <svg class="">
                <use href="${icons}#icon-bookmark${
            this._data.bookmarked ? "-fill" : ""
        }"></use>
            </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>
        `;
    }

    _generateMarkupIngredient(ing) {
        return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ""
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
      `;
    }
}

export default new RecipeView();
