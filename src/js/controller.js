import icons from '../img/icons.svg'
import * as model from './model.js';
import recipeView from '../view/recipeView.js';
import searchView from '../view/searchView.js';
import resultView from '../view/resultView.js';
import paginationView from '../view/paginationView.js';
import bookMarkView from '../view/bookMarkView.js';
import addRecipeView from '../view/addRecipeView.js';
const controlRecipe  =  async function (){
    try{
        const id = window.location.hash.slice(1)
        if(!id) return
        await model.loadRecipe(id)
        recipeView.render(model.state.recipe)
        bookMarkView.update(model.state.bookMarks)

    }
    catch(err){
        recipeView.renderErrorMessage()
    }
    
}
const controlSearchRecipe = async function(){
    try{
        const query =  searchView.query();
        if(!query) return;

        await model.searchRecipe(query)
        resultView.render(model.loadPagination())
        paginationView.render(model.state.search)

       }
       catch(err){
        resultView.renderErrorMessage(err)
       }
}
const controlPagination =  function(goToPage){
    resultView.update(model.loadPagination(goToPage))
    paginationView.render(model.state.search)
}
const controlNewServing = function(newServing){
    recipeView.update(model.updateServing(newServing))

}

const setLocalStorage = () =>{
    localStorage.setItem(`bookmark`, JSON.stringify(model.state.bookMarks))
}
const getLocalStorage = () => {
    const data = localStorage.getItem(`bookmark`)
    if(!data) return
    const bookmark = JSON.parse(data)

    // Assigning bookmark from localStorage
    model.state.bookMarks = bookmark

    //Render BookMarks After Loading
    bookMarkView.render(model.state.bookMarks)
}
const controlUpdateResult  = function(){
    resultView.update(model.loadPagination())
}
const controlAddBookMark =  function(){

    //1. Process to Controll
    model.bookMark(model.state.recipe)

    //2. Render after BookMared
    bookMarkView.render(model.state.bookMarks)
    recipeView.update(model.state.recipe)

    // BookMarked Push to Local Storage
    setLocalStorage()
}

const controlAddRecipe = async function(handler) {
    try{
       await model.addRecipe(handler)
    }
    catch(err){
        addRecipeView.renderErrorMessage(err.message)
    }
}

const init = function (){
    recipeView.addHandlerRecipe(controlRecipe)
    searchView.addHandlerSearch(controlSearchRecipe)
    paginationView.addHandlerView(controlPagination)
    recipeView.addHandlerUpdateRecipe(controlNewServing)
    resultView.addHandlerUpdateResult(controlUpdateResult)
    recipeView.addHandlerBookMark(controlAddBookMark)
    addRecipeView.addHandlerUploadRecipe(controlAddRecipe)
    console.log(`Welcome`)
}

init()

getLocalStorage();
