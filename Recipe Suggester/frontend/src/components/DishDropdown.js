import React from "react";

async function fetchDishDropdownResults (setDropdownResults) {
    await fetch('http://flip2.engr.oregonstate.edu:9005/selectdish')
    .then((response) => response.json())
    .then((response) => {setDropdownResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })  
  };

function DishDropdown({dish}) {
    return( 
        <>
            <option value={dish.dish_id}>{dish.dish_name}</option>
        </>
    );
}

export {DishDropdown, fetchDishDropdownResults};