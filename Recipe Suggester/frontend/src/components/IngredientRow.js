import React from 'react';

function IngredientRow({ ingredient }) {

    function deleteIngredient() {
        let data = { ingredient_id: ingredient.ingredient_id }
        const response = fetch('http://flip2.engr.oregonstate.edu:9005/deleteingredient', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        window.location.reload();
      }

    return (
        <tr>
            <td>{ingredient.ingredient_id}</td>
            <td>{ingredient.ingredient_name}</td>
            <td>{ingredient.ingredient_type}</td>
            <td><button onClick={deleteIngredient} type="submit">Delete</button></td>
        </tr>
    );
}

export default IngredientRow;