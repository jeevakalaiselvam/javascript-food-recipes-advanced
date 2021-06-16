import icons from "url:../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() {
        const currentPage = +this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        //Page 1 - There are other pages
        if (currentPage === 1 && numPages > 1) {
            return this.showRightButton(currentPage);
        }

        //Page 1 - There are no other pages
        if (currentPage === numPages && numPages > 1) {
            return this.showLeftButton(currentPage);
        }

        //Other Page
        if (currentPage < numPages) {
            return (
                this.showLeftButton(currentPage) +
                this.showRightButton(currentPage)
            );
        }

        return ``;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");

            if (!btn) return;

            const gotoPage = btn.dataset.goto;
            handler(gotoPage);
        });
    }

    showLeftButton(number) {
        return `<button data-goto="${
            number - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${number - 1}</span>
                </button>`;
    }

    showRightButton(number) {
        return `<button  data-goto="${
            number + 1
        }" class="btn--inline pagination__btn--next">
                <span>Page ${number + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>`;
    }
}
export default new PaginationView();
