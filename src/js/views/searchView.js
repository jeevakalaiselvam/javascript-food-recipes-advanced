class SearchView {
    #parentElement = document.querySelector(".search");
    #searchInput = document.querySelector(".search__field");

    getQuery() {
        const query = this.#searchInput.value;
        this.#clear();
        return query;
    }

    #clear() {
        this.#searchInput.value = "";
    }

    addHandlerSearch(handler) {
        this.#parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
