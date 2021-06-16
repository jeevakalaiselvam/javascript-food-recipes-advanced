import View from "./View";
class SearchView {
    _parentElement = document.querySelector(".search");
    _searchInput = document.querySelector(".search__field");

    getQuery() {
        const query = this._searchInput.value;
        this._clear();
        return query;
    }

    _clear() {
        this._searchInput.value = "";
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
