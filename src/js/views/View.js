import icons from "url:../../img/icons.svg";
export default class View {
    _data;
    render(data) {
        this._data = data;
        const recipe = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", recipe);
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner(size = "5rem") {
        const spinner = `
            <div class="spinner">
                <i class="fas fa-circle-notch icon-spinner"></i>
            </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", spinner);
        const spinnerIcon = document.querySelector(".icon-spinner");
        spinnerIcon.style.fontSize = size;
    }

    renderError(message = this._errorMessage) {
        const error = `<div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", error);
    }

    renderMessage(message = this._message) {
        const messageI = `<div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", messageI);
    }
}
