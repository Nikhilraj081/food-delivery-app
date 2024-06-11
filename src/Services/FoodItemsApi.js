import React from "react";
import { myAxios } from "./Helper";



async function getFoodItems(){
    return await myAxios.get('/restaurants-service/items/all').then((response)=> response.data)
};

async function getFoodItemsByCategory(category){
    return await myAxios.get('/restaurants-service/items/category/'+category).then((response)=> response.data)
};

export {getFoodItems, getFoodItemsByCategory};