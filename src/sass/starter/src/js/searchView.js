import View from "./view/View";
class searchView extends View {
   _parentEl = document.querySelector(`.search__field`);
   _searchEl = document.querySelector(`.results`)


    getQuery(){
      this._clear()
        const query =  this._parentEl.value;
        return query
    }

}

export default new searchView();