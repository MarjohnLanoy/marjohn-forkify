import icons from '../img/icons.svg'
import PreviewView from './previewView';

class BookMarkView extends PreviewView {
    _parentEl = document.querySelector(`.bookmarks__list`);
    _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
    _generateMarkup(){
    return  this._data.length === 0 ? this.renderErrorMessage(): this._data.map(bookmark => this._generatePreviewView(bookmark)).join(``)
    }
    addHandlerUpdateResult(handler){
      [`load`, `hashchange`].forEach(el => window.addEventListener(el, handler))
    }
    
    renderErrorMessage(message = this._errorMessage){
        return  `<div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>
                   ${message} :)
                  </p>
                </div>`
      }
}

export default new BookMarkView();