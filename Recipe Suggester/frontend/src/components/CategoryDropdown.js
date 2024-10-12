import React from "react";

async function fetchCategoryDropdownResults (setDropdownResults) {
    await fetch('http://flip2.engr.oregonstate.edu:9005/categories')
    .then((response) => response.json())
    .then((response) => {setDropdownResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })  
  };

function CategoryDropdown({category}) {
    return( 
        <>
            <option value={category.category_id}>{category.category_name}</option>
        </>
    );
}

export {CategoryDropdown, fetchCategoryDropdownResults};