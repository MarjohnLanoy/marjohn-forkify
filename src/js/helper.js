
import {async} from 'regenerator-runtime';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  export const getJSON = async function(URL){
    try{
      const res = await fetch(URL)
      if(!res.ok) return new Error(`Can't Fetch Data!`)
      const data = await res.json();

      return data
    }
    catch(err){
        throw new Error(err)
    }
  }
  export const setJSON = async function(URL, newRecipe){
    try{
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe)
      })
      if(!res.ok) return new Error(`Can't Fetch Data!`)
      const data = await res.json();

      return data
    }
    catch(err){
        throw new Error(err)
    }
  }