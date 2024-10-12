import React, { useState } from "react";
import IngredientRow from "../components/IngredientRow";
import LoadTable from "../components/LoadTable";

function IngredientsPage() {

  const [results, setResults] = useState([])
  const fetchResults = () => {
    fetch('http://flip2.engr.oregonstate.edu:9005/ingredients')
    .then((response) => response.json())
    .then((response) => {setResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })
  };

  async function createIngredient() {
    let name = document.getElementById("newIngredientName").value
    let type = document.getElementById("newIngredientType").value
    let data = { ingredient_name: name, ingredient_type: type}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/newingredient', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  LoadTable(fetchResults);

  return (
    <>
      <h2>Ingredients Table</h2>
      <table id="ingredients">
        <caption>Ingredients</caption>
        <thead>
          <tr>
              <th>Ingredient ID</th>
              <th>Ingredient Name</th>
              <th>Ingredient Type</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody id="ingredientRow">
          {results.map((ingredient, i) => <IngredientRow ingredient={ingredient} key={i} />)}
        </tbody>
      </table>
      <form>
        <p><label>Ingredient Name: </label><input type="text" id="newIngredientName" /></p>
        <p><label>Ingredient Type: </label><input type="text" id="newIngredientType" /></p>
        <p><button onClick={createIngredient} type="submit">Add Ingredient</button></p>
      </form>
    </>
  );
}

export default IngredientsPage;