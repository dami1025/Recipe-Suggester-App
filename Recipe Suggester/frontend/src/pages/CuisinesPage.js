import React, {useState} from "react";
import CuisineRow from "../components/CuisineRow";
import {CuisineDropdown, fetchCuisineDropdownResults} from "../components/CuisineDropdown";
import LoadTable from "../components/LoadTable";

function CuisinesPage() {

  const [results, setResults] = useState([])
  const [dropdownResults, setDropdownResults] = useState([])

  async function fetchResults () {
    await fetch('http://flip2.engr.oregonstate.edu:9005/cuisines')
    .then((response) => response.json())
    .then((response) => {setResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })
  };

  async function createCuisine() {
    let cuisineName = document.getElementById("newCuisineName").value
    let ingredientList = document.getElementById("newIngredientList").value
    let data = { cuisine_name: cuisineName, staple_ingredient_list: ingredientList}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/newcuisine', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function editCuisine() {
    let cuisineID = document.getElementById("editCuisineDropdown").value
    let cuisineName = document.getElementById("editCuisineName").value
    let ingredientList = document.getElementById("editIngredientList").value
    let data = { cuisine_id: cuisineID, cuisine_name: cuisineName, staple_ingredient_list: ingredientList}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/editcuisine', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  const initializePage = () => {
    fetchResults();
    fetchCuisineDropdownResults(setDropdownResults);
  }

  LoadTable(initializePage);

  return (
    <>
      <h2>Cuisines Table</h2>
      <table>
        <caption>Cuisines</caption>
        <thead>
          <tr>
              <th>Cuisine ID</th>
              <th>Cuisine Name</th>
              <th>Staple Ingredient List</th>
          </tr>
        </thead>
        <tbody id="cuisineRow">
          {results.map((cuisine, i) => <CuisineRow cuisine={cuisine} key={i} />)}
        </tbody>
      </table>

      <form>
        <p><label>Cuisine Name: </label><input type="text" id="newCuisineName" /></p>
        <p><label>Staple Ingredient List: </label><input type="text" id="newIngredientList" /></p>
        <p><button onClick={createCuisine} type="submit">Add Cuisine</button></p>
      </form>

      <label>Choose a cuisine to update:</label>
      <select id='editCuisineDropdown'>
        {dropdownResults.map((cuisine, i) => <CuisineDropdown cuisine={cuisine} key={i} />)}
      </select>
      <form>
        <p><label>New Name: </label><input type="text" id="editCuisineName" /></p>
        <p><label>New Ingredient List: </label><input type="text" id="editIngredientList" /></p>
        <p><button onClick={editCuisine} type="submit">Edit Cuisine</button></p>
      </form>
    </>
  );
}

export default CuisinesPage;