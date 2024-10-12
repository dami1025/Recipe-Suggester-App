import { Link } from "react-router-dom";


function Nav() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="../dishes">Dishes</Link>
                <Link to="../ingredients">Ingredients</Link>
                <Link to="../cuisines">Cuisines</Link>
                <Link to="../categories">Categories</Link>
                <Link to="../ingredientsdishes">Ingredients_Dishes</Link>
            </nav>
        </>
    );
}

export default Nav;