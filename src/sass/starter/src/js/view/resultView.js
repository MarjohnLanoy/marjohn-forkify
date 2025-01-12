import icons from '../../img/icons.svg'
import View from './View.js'

class ResultView extends View {
  _parentEl = document.querySelector(`.results`)
  _searchButton = document.querySelector(`.search__btn`);
  _searchLabel = document.querySelector(`.search__field`);
  _errorMessage = `No Recipe Found`;
  _message = `Success Data Found!`
  
    _generateMarkup(){
    return this._data.map(data => this._generateMarkupPreview(data)).join(` `)
    }
    _generateMarkupPreview(search){
      return `<li class="preview">
    <a class="preview__link preview__link--active" href="#${search.id}">
      <figure class="preview__fig">
        <img src="${search.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${search.title}...</h4>
        <p class="preview__publisher">${search.publisher}</p>
        <div class="preview__user-generated">
          <svg>
              <use href="${icons}}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`
    }
    addHandlerView(handler){
        this._searchButton.addEventListener(`click`, function(e){
            e.preventDefault();
            handler();
        })
      }
}

export default new ResultView()