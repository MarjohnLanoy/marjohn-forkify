import { API_URL } from "../config";
import { getJson } from "../helper.js";
 import { RES_PER_PAGE } from "../config";
export const state = {
    recipe: {

    },
    bookmark: {

    },
    search: {
        query: ``,
        results: [ ],
        page: 1,
        resultPerPage: RES_PER_PAGE,
    },
}

export const loadRecipe = async function(id) {
    try {
       const data =  await getJson(`${API_URL}${id}`)
       const {recipe} = data.data
        state.recipe = {
            id: recipe.id,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            title: recipe.title,
        };
        console.log(data)
    } catch (err) {
        throw err
    }
};

export const loadSearchResult = async function(query){
    try{
        state.search.query = query
        const data = await getJson(`${API_URL}?search=${query}`)
         state.search.results = data.data.recipes.map(rec => {
          return {
                id: rec.id,
                image: rec.image_url,
                publisher: rec.publisher,
                title: rec.title,
            }
        })
    }
    catch(err){
        throw err 
    }
}

export const getSearchResultPage = function(page = state.search.page){
    state.search.page = page
    const start = (page - 1)* state.search.resultPerPage;
    const end = page * state.search.resultPerPage;

     return state.search.results.slice(start,end)
}

