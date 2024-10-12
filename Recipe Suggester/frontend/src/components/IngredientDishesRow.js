import React from 'react';

function IngredientDishesRow({ ingredientDish }) {
    return (
        <tr>
            <td>{ingredientDish.ingredient_id}</td>
            <td>{ingredientDish.ingredient_name}</td>
            <td>{ingredientDish.dish_id}</td>
            <td>{ingredientDish.dish_name}</td>
        </tr>
    );
}

export default IngredientDishesRow;