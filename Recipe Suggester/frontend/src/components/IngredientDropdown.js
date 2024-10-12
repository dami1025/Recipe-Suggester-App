import React from "react";

async function fetchIngredientDropdownResults (setDropdownResults) {
    await fetch('http://flip2.engr.oregonstate.edu:9005/selectingredient')
    .then((response) => response.json())
    .then((response) => {setDropdownResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })  
  };

function IngredientDropdown({ingredient}) {
    return( 
        <>
            <option value={ingredient.ingredient_id}>{ingredient.ingredient_name}</option>
        </>
    );
}

export {IngredientDropdown, fetchIngredientDropdownResults};