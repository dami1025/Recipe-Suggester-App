import React, {useState} from "react";
import CategoryRow from "../components/CategoryRow";
import LoadTable from "../components/LoadTable";

function CategoriesPage() {

  const [results, setResults] = useState([])
  const fetchResults = () => {
    fetch('http://flip2.engr.oregonstate.edu:9005/categories')
    .then((response) => response.json())
    .then((response) => {setResults(response);})
    .catch(() => {
        alert('Error, was not able to access the database.')
    })
  };

  async function createCategory() {
    let name = document.getElementById("newCategoryName").value
    let data = { category_name: name}
    const response = await fetch('http://flip2.engr.oregonstate.edu:9005/newcategory', {
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
      <h2>Categories Table</h2>
      <table id="categories">
        <caption>Categories</caption>
        <thead>
          <tr>
              <th>Category ID</th>
              <th>Category Name</th>
          </tr>
        </thead>
        <tbody id="categoryRow">
          {results.map((category, i) => <CategoryRow category={category} key={i} />)}
        </tbody>
      </table>
      <form>
        <p><label>Category Name: </label><input type="text" id="newCategoryName" /></p>
        <p><button onClick={createCategory} type="submit">Add Category</button></p>
      </form>
    </>
  );
}

export default CategoriesPage;