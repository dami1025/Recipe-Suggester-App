import React, {useState} from "react";
import IngredientDishesRow from "../components/IngredientDishesRow";
import { IngredientDropdown, fetchIngredientDropdownResults } from "../components/IngredientDropdown";
import { DishDropdown, fetchDishDropdownResults } from "../components/DishDropdown";
import LoadTable from "../components/LoadTable";

function IngredientsDishesPage() {

  async function createIntersection() {
    let ingredientID = document.getElementById("ingredientDropdown").value
    let dishID = document.getElementById("dishDropdown").value
    let data = { ingredient_id: ingredientID, dish_id: dishID }
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/newingredientdish', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  const [results, setResults] = useState([])
  const fetchResults = () => {
    fetch('http://flip2.engr.oregonstate.edu:9005/ingredientsdishes')
    .then((response) => response.json())
    .then((response) => {setResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })
  };

  const [ingredientDropdownResults, setIngredientDropdownResults] = useState([])
  const [dishDropdownResults, setDishDropdownResults] = useState([])

  const initializePage = () => {
    fetchResults();
    fetchDishDropdownResults(setDishDropdownResults);
    fetchIngredientDropdownResults(setIngredientDropdownResults);
  }

  LoadTable(initializePage)

  return (
    <>
      <h2>Ingredients Dishes Intersection Table</h2>
      <table id="ingredientsdishes">
        <caption>Ingredients-Dishes</caption>
        <thead>
          <tr>
              <th>Ingredient ID</th>
              <th>Ingredient Name</th>
              <th>Dish ID</th>
              <th>Dish Name</th>
          </tr>
        </thead>
        <tbody id="intersectionRow">
          {results.map((ingredientDish, i) => <IngredientDishesRow ingredientDish={ingredientDish} key={i} />)}
        </tbody>
      </table>

      <form>
        <p>
          <label>Dish Name: </label>
          <select id='dishDropdown'>
            {dishDropdownResults.map((dish, i) => <DishDropdown dish={dish} key={i} />)}
          </select>
        </p>
        <p>
          <label>Ingredient Name: </label>
          <select id='ingredientDropdown'>
            {ingredientDropdownResults.map((ingredient, i) => <IngredientDropdown ingredient={ingredient} key={i} />)}
          </select>
        </p>
        <p><button onClick={createIntersection} type="submit">Add Relationship</button></p>
      </form>
    </>
  );
}

export default IngredientsDishesPage;