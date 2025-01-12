
class SearchView {
    _parentEl = document.querySelector(`.search`);

    query(){
        const query = document.querySelector(`.search__field`).value
        return query
    }
    addHandlerSearch(handler){
        this._parentEl.addEventListener(`submit`, function(e){
            e.preventDefault()
            handler()
        })
    }
}

export default new SearchView()

