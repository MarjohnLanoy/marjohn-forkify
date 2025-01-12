import icons from '../img/icons.svg'
import PreviewView from './previewView';

class ResultView extends PreviewView {
    _parentEl = document.querySelector(`.results`)
    _generateMarkup(){
      return this._data.map(result => this._generatePreviewView(result)).join(``)
    }
    addHandlerUpdateResult(handler){
      [`load`, `hashchange`].forEach(el => window.addEventListener(el, handler))
    }
}

export default new ResultView();