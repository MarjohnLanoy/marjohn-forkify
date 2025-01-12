import { async } from "regenerator-runtime"
import { API_LINK, MAX_PAGE_SHOW, API_KEY } from "./config"
import { getJSON,setJSON } from "./helper"


export const state = {
    recipe: {},
    search:{
        result:[],
        resultPerPage: MAX_PAGE_SHOW,
        page: 1
    },

    bookMarks: []
}

export const loadRecipe = async function(id){
   try{
    const data = await getJSON(`${API_LINK}/${id}`)
    const recipe = data.data.recipe;
    state.recipe = {
        id: recipe.id,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        image: recipe.image_url,
        publisher: recipe.publisher,
        servings: recipe.servings,
        title: recipe.title,
        sourceURL: recipe.source_url,
    }
    state.bookMarks.some(bkmarked => bkmarked.id === state.recipe.id) ? state.recipe.bookMarked = true :  state.recipe.bookMarked = false
   }
   catch(err){
    throw new Error(err)
   }
}

export const searchRecipe = async function(search){
    try{
        const data = await getJSON(`${API_LINK}?search=${search}`)
        state.search.result = data.data.recipes.map(rec => {
           return { 
            image: rec.image_url,
            publisher: rec.publisher,
            id: rec.id,
            title: rec.title
            }
        })
    }

    catch(err){
        throw new Error(err)
    }
}

export const loadPagination = function(page = state.search.page ){
    state.search.page = page
    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;
    
    // Slice the array to get the items for the current page
    return state.search.result.slice(start, end);
}

export const updateServing = function(newServing){
    state.recipe.ingredients.map(ing => ing.quantity =  (newServing * ing.quantity) / state.recipe.servings);
    state.recipe.servings = newServing;
    return state.recipe;
}

export const bookMark = function(bookmark){
    if(!state.bookMarks.some(bkMark => bkMark.id === bookmark.id)){
        state.bookMarks.push(bookmark)
        return state.recipe.id === bookmark.id ? bookmark.bookMarked = true : ``

    }
    if(state.bookMarks.some(bkMark => bkMark.id === bookmark.id) === true){
        const index = state.bookMarks.findIndex(data => data.id === bookmark.id)
        state.bookMarks.splice(index,1)
        return state.recipe.id === bookmark.id ? bookmark.bookMarked = false : ``
    }
}

export const addRecipe = async function(newRecipe){
   try{
    const ingredient = Object.entries(newRecipe)
    .filter((ing) => ing[0]
    .startsWith('ingredient-') && ing[1])
    .map(ing=> {
        const ingArr =  ing[1].replaceAll(` `,``).split(`,`)
        if(ingArr.length!== 3) throw new Error(`Wrong Templete`)

       const  [quantity, unit, decription] = ingArr
        return {quantity, unit, decription}
     })
     const recipe = {
        id: newRecipe.id,
        cookingTime: +newRecipe.cookingTime,
        ingredients: ingredient,
        image: newRecipe.image,
        publisher: newRecipe.publisher,
        servings: +newRecipe.servings,
        title: newRecipe.title,
        sourceURL: newRecipe.sourceUrl,
     }

    const data =  await setJSON(`${API_LINK}?key=${API_KEY}`, recipe)
     console.log(recipe)
   }
   catch(err){
     new Error(err.message)
   }
}