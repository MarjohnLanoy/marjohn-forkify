import View from "./View";
import icons from '../../img/icons.svg'

 class PaginationView extends View{

    _parentEl = document.querySelector(`.pagination`)
    _prevButton = document.querySelector(`.pagination__btn--prev`)
    _nextButton = document.querySelector(`.pagination__btn--next`)

    _generateMarkup(){
        const curPage = this._data.page
        console.log(curPage)
        const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage)
        console.log(numPages)
        // Page 1, and there are other pages
        if(this._data.page === 1 && numPages > 1) {
           return `<button data-goto="${curPage +1 }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage +1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }
        // Page 1 abd tgere are No other Pages

        // Last Page
        if(this._data.page === numPages && numPages > 1) {
            return` <button data-goto="${curPage -1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1 }</span>
          </button> `
        }
        if (this._data.page < numPages){
            return `
          <button data-goto="${curPage +1 }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage +1 }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <button data-goto="${curPage -1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1 }</span>
          </button> `
        }
        return ` `
    }
    _generateMarkupNextButton(){
        return `<button data-goto="${curPage -1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1}</span>
          </button> `
    }
    addHandlerView(handler){
        this._parentEl.addEventListener(`click`, function(e){
           const btn = e.target.closest(`.btn--inline`)
           if(!btn) return
           const goToPage =+ btn.dataset.goto;
           return handler(goToPage)
        })
   }
}

export default new PaginationView()