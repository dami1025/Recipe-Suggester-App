import React from "react";

function DishRow({dish}) {

    function deleteDish() {
        let data = { dish_id: dish.dish_id }
        const response = fetch('http://flip2.engr.oregonstate.edu:9005/deletedish', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        window.location.reload();
      }

    return( 
        <>
            <tr>
            <td>{dish.dish_id}</td>
            <td>{dish.dish_name}</td>
            <td>{dish.cooking_method}</td>
            <td>{dish.complexity}</td>
            <td>{dish.cook_time}</td>
            <td>{dish.cuisine_name}</td>
            <td>{dish.category_name}</td>
            <td><button onClick={deleteDish} type="submit">Delete</button></td>
            </tr>
        </>
    );
}

export default DishRow;