import icons from '../img/icons.svg'
import View from './view';

class addRecipeView extends View {
    _parentEl = document.querySelector(`.upload`)
    _overlay = document.querySelector(`.overlay`)
    _windowRecipe = document.querySelector(`.add-recipe-window`)
    _closeBtn = document.querySelector(`.btn--close-modal`)
    _recipeAddBtn = document.querySelector(`.nav__btn--add-recipe`);
    constructor(){
        super();
        this._addHandlerViewRecipe();
    }

    _generateMarkup(){
    }

    _addHandlerToggleWindow(){
       return [this._overlay, this._windowRecipe].forEach(el => el.classList.toggle(`hidden`))
    }

    _addHandlerViewRecipe(){
      [this._recipeAddBtn, this._closeBtn].forEach(el => el.addEventListener(`click`, this._addHandlerToggleWindow.bind(this)))
    }

    addHandlerUploadRecipe(handler){
        this._parentEl.addEventListener(`submit`, function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            handler(data)
          }) 
    }
}

export default new addRecipeView();