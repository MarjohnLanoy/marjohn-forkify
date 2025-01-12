import {async} from 'regenerator-runtime';
import * as model from './view/model.js'
import recipeView from './view/recipeView.js';
import searchView from './searchView.js';
import resultView from '../js/view/resultView.js'
import paginationView from './view/paginationView.js';

// https://forkify-api.herokuapp.com/v2

 const  controllRecipe = async function(){
 try{
   //Event Handler
   const id = window.location.hash.slice(1);

   //Guard Clause
   if(!id) return

   //1 Loading Recipe
   await model.loadRecipe(id)
   recipeView.render(model.state.recipe)
 }
 catch(err){
  recipeView.renderError()
}
}

const controllSearchResults = async function(){
  try {
    resultView.renderSpinner()

    // Getting Query
    const query = searchView.getQuery();
    if(!query) return 

    await model.loadSearchResult(query)
    //Rendering Result
    resultView.render(model.getSearchResultPage())

    //Render Initial
    paginationView.render(model.state.search)

  }
  catch(err){
  }
}
const controlPagination = function(goToPage){

  paginationView.render(model.state.search)

  console.log(`Pagination`)
}
function init(){
  recipeView.addHandlerRender(controllRecipe)
  resultView.addHandlerView(controllSearchResults)
  paginationView.addHandlerView(controlPagination)

}
init()




