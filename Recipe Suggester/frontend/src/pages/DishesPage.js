import React, { useState } from "react";
import DishRow from "../components/DishRow";
import { CuisineDropdown, fetchCuisineDropdownResults } from "../components/CuisineDropdown";
import { CategoryDropdown, fetchCategoryDropdownResults } from "../components/CategoryDropdown";
import { DishDropdown, fetchDishDropdownResults } from "../components/DishDropdown";
import LoadTable from "../components/LoadTable";

function DishesPage() {

  const [results, setResults] = useState([])
  const [cuisineDropdownResults, setCuisineDropdownResults] = useState([])
  const [categoryDropdownResults, setCategoryDropdownResults] = useState([])
  const [dishDropdownResults, setDishDropdownResults] = useState([])

  async function fetchResults () {
    await fetch('http://flip2.engr.oregonstate.edu:9005/dishes')
    .then((response) => response.json())
    .then((response) => {setResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })
  };

  async function createDish() {
    let name = document.getElementById("newDishName").value
    let method = document.getElementById("newCookMethod").value
    let complexity = document.getElementById("newComplexity").value
    let cookTime = document.getElementById("newCookTime").value
    let cuisineID = document.getElementById("newCuisineDropdown").value
    let categoryID = document.getElementById("newCategoryDropdown").value
    let data = { dish_name: name, cooking_method: method, complexity: complexity, cook_time: cookTime, cuisine_id: cuisineID, category_id: categoryID}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/newdish', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function editDish() {
    let dishID = document.getElementById("editDishDropdown").value
    let name = document.getElementById("editDishName").value
    let method = document.getElementById("editCookMethod").value
    let complexity = document.getElementById("editComplexity").value
    let cookTime = document.getElementById("editCookTime").value
    let cuisineID = document.getElementById("editCuisineDropdown").value
    let categoryID = document.getElementById("editCategoryDropdown").value
    let data = { dish_id: dishID, dish_name: name, cooking_method: method, complexity: complexity, cook_time: cookTime, cuisine_id: cuisineID, category_id: categoryID}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/editdish', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  const initializePage = () => {
    fetchResults();
    fetchCuisineDropdownResults(setCuisineDropdownResults);
    fetchCategoryDropdownResults(setCategoryDropdownResults);
    fetchDishDropdownResults(setDishDropdownResults);
  }
  LoadTable(initializePage);

  return (
    <>
      <h2>Dishes Table</h2>
      <table id="dishes">
        <caption>Dishes</caption>
        <thead>
          <tr>
              <th>Dish ID</th>
              <th>Dish Name</th>
              <th>Cooking Method</th>
              <th>Complexity</th>
              <th>Cooking Time</th>
              <th>Cuisine</th>
              <th>Category</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody id="dishRow">
          {results.map((dish, i) => <DishRow dish={dish} key={i} />)}
        </tbody>
      </table>
      <form>
        <p><label>Dish Name: </label><input type="text" id="newDishName" /></p>
        <p><label>Cooking Method: </label><input type="text" id="newCookMethod" /></p>
        <p><label>Complexity: </label><input type="text" id="newComplexity" /></p>
        <p><label>Cooking Time: </label><input type="text" id="newCookTime" /></p>
        <p><label>Cuisine: </label>
          <select id="newCuisineDropdown">
            {cuisineDropdownResults.map((cuisine, i) => <CuisineDropdown cuisine={cuisine} key={i} />)}
          </select>
        </p>
        <p><label>Category: </label>
        <select id="newCategoryDropdown">
            {categoryDropdownResults.map((category, i) => <CategoryDropdown category={category} key={i} />)}
          </select>
        </p>
        <p><button onClick={createDish} type="submit">Add Dish</button></p>
      </form>
      <label>Choose a dish to update:</label>
      <select id="editDishDropdown">
            {dishDropdownResults.map((dish, i) => <DishDropdown dish={dish} key={i} />)}
          </select>
      <form>
        <p><label>New Name: </label><input type="text" id="editDishName" /></p>
        <p><label>New Cooking Method: </label><input type="text" id="editCookMethod" /></p>
        <p><label>New Complexity: </label><input type="text" id="editComplexity" /></p>
        <p><label>New Cooking Time: </label><input type="text" id="editCookTime" /></p>
        <p><label>New Cuisine: </label>
        <select id="editCuisineDropdown">
            {cuisineDropdownResults.map((cuisine, i) => <CuisineDropdown cuisine={cuisine} key={i} />)}
          </select>
        </p>
        <p><label>New Category: </label>
          <select id="editCategoryDropdown">
            {categoryDropdownResults.map((category, i) => <CategoryDropdown category={category} key={i} />)}
          </select>
        </p>
        <p><button onClick={editDish} type="submit">Edit Dish</button></p>
      </form>
    </>
  );
}

export default DishesPage;