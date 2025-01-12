import icons from '../img/icons.svg'
export default class View {
    _data
    _parentEl = document.querySelector(`.recipe`)
    _errorMessage = `Please Input Correct Recipe, Please Try Again!`
    render(data){
        this._data = data;
        this._renderSpinner();
        this._clear();
        this._parentEl.insertAdjacentHTML(`beforeend`, this._generateMarkup())
    }
    update(data){
      this._data = data;
      
      const newMarkup =  this._generateMarkup();

      const newDom = document.createRange().createContextualFragment(newMarkup)
      const newElements = Array.from(newDom.querySelectorAll(`*`));
      const curElelements = Array.from(this._parentEl.querySelectorAll(`*`))
      newElements.forEach((newEl, i) => {
        const curEl = curElelements[i]
        if(!newEl.isEqualNode(curEl) && curEl.firstChild?.nodeValue.trim() !== ``){
          curEl.textContent = newEl.textContent
        }
        if(!newEl.isEqualNode(curEl)){
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
        }
      } )
    }
   
    renderErrorMessage(message = this._errorMessage){
      this._clear();
      const html = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `
          return this._parentEl.insertAdjacentHTML('beforeend',html)
    }
    _renderSpinner(){
      this._clear();
      const html =  `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
        return this._parentEl.insertAdjacentHTML('beforeend',html)
    }
    _clear(){
      this._parentEl.textContent = ``
    }
   

   
}

