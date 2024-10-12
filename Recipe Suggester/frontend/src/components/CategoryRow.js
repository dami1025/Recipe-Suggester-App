import React from "react";

function CategoryRow({category}) {
    return( 
        <>
            <tr>
            <td>{category.category_id}</td>
            <td>{category.category_name}</td>
            </tr>
        </>
    );
}

export default CategoryRow;