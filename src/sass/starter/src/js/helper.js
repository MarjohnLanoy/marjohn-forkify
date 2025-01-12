import { TIMEOUT_SEC } from "./config";
import { async } from "regenerator-runtime";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJson = async function(url){
    try{
        const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
        const data = res.json();
        if(!res.ok) throw new Error(`${res.status} ${res.message}`);
        return data
    }
    catch(err){
        throw new Error(err)
    }
}

