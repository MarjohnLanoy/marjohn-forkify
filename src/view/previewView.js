import icons from '../img/icons.svg'
import View from './view';

 export default class PreviewView extends View  {
    _generatePreviewView(data){
      const id = window.location.hash.slice(1)
    return ` <li class="preview ${data.id !== id ? `` : `preview__link--active`} ">
                    <a class="preview__link" href="#${data.id}">
                      <figure class="preview__fig">
                        <img src="${data.image}" alt="${data.title}" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                        ${data.title}
                        </h4>
                        <p class="preview__publisher">${data.publisher}</p>
                      </div>
                    </a>
                  </li>`
    }
}

