import React from "react";

function CuisineRow({cuisine}) {
    return( 
        <>
            <tr>
            <td>{cuisine.cuisine_id}</td>
            <td>{cuisine.cuisine_name}</td>
            <td>{cuisine.staple_ingredient_list}</td>
            </tr>
        </>
    );
}

export default CuisineRow;