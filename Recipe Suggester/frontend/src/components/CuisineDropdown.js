import React from "react";

async function fetchCuisineDropdownResults (setDropdownResults) {
    await fetch('http://flip2.engr.oregonstate.edu:9005/selectcuisine')
    .then((response) => response.json())
    .then((response) => {setDropdownResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })  
  };

function CuisineDropdown({cuisine}) {
    return( 
        <>
            <option value={cuisine.cuisine_id}>{cuisine.cuisine_name}</option>
        </>
    );
}

export {CuisineDropdown, fetchCuisineDropdownResults};