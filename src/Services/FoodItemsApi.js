import React from "react";
import { myAxios } from "./Helper";



const getFoodItems = () => {
    return myAxios.get('/restaurants-service/items/all').then((response)=> response.data)
};



export default getFoodItems;