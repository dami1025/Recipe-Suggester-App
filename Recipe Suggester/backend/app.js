// Express
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app     = express();

app.use(cors());
app.use(bodyParser.json());

PORT        = 9005;

// Database
var db = require('./db-connector');

// Homepage
app.get('/', function(req, res) {
    res.send("Recipe Suggester DB Server")
});

/* Creation Queries */

// add new dish
app.post('/newdish', function(req, res) {
    let dishName = req.body.dish_name;
    let cookingMethod = req.body.cooking_method;
    let complexity = req.body.complexity;
    let cookTime = req.body.cook_time;
    let cuisineID = req.body.cuisine_id;
    let categoryID = req.body.category_id;
    query = `INSERT INTO dishes (dish_name, cooking_method, complexity, cook_time, cuisine_id, category_id)
            VALUES ('${dishName}', '${cookingMethod}', '${complexity}', ${cookTime}, ${cuisineID}, ${categoryID});`;
    db.pool.query(query);
});

// add new ingredient
app.post('/newingredient', function(req, res) {
    let ingredientName = req.body.ingredient_name
    let ingredientType = req.body.ingredient_type
    query = `INSERT INTO ingredients (ingredient_name, ingredient_type)
            VALUES ('${ingredientName}','${ingredientType}')`;
    db.pool.query(query);
});

// add new cuisine
app.post('/newcuisine', function(req, res) {
    let cuisineName = req.body.cuisine_name
    let ingredientList = req.body.staple_ingredient_list
    query = `INSERT INTO cuisines (cuisine_name, staple_ingredient_list)
            VALUES ('${cuisineName}','${ingredientList}')`;
    db.pool.query(query);
});

// add new category
app.post('/newcategory', function(req, res) {
    let categoryName = req.body.category_name
    query = `INSERT INTO categories (category_name)
            VALUES ('${categoryName}')`;
    db.pool.query(query);
});

// add new intersection
app.post('/newingredientdish', function(req, res) {
    let ingredientID = req.body.ingredient_id
    let dishID = req.body.dish_id
    query = `INSERT INTO ingredients_dishes (ingredient_id, dish_id)
            VALUES (${ingredientID}, ${dishID})`;
    db.pool.query(query);
});

/* Read Queries */

// populate dish dropdown
app.get('/selectdish', function(req, res) {
    query = 'SELECT dish_id, dish_name FROM dishes;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate dish table page
app.get('/dishes', function(req, res) {
    query = `SELECT dish_id, dish_name, cooking_method, complexity, cook_time, cuisines.cuisine_name, categories.category_name FROM dishes
            JOIN cuisines ON cuisines.cuisine_id = dishes.cuisine_id
            JOIN categories ON categories.category_id = dishes.category_id
            ORDER BY dish_id;`;
    db.pool.query(query, function(err, results, field) {
        res.send(JSON.stringify(results));
    });
});

// populate ingredient dropdown
app.get('/selectingredient', function(req, res) {
    query = 'SELECT ingredient_id, ingredient_name FROM ingredients;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate ingredient table page
app.get('/ingredients', function(req, res) {
    query = 'SELECT * FROM ingredients;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate cuisine dropdown
app.get('/selectcuisine', function(req, res) {
    query = 'SELECT cuisine_id, cuisine_name FROM cuisines;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate cuisine table page
app.get('/cuisines', function(req, res) {
    query = 'SELECT * FROM cuisines;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate category table page and dropdown
app.get('/categories', function(req, res) {
    query = 'SELECT * FROM categories;';
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

// populate intersection table page
app.get('/ingredientsdishes', function(req, res) {
    query = `SELECT ing.ingredient_name, id.ingredient_id, dishes.dish_name, id.dish_id FROM ingredients_dishes as id
            JOIN ingredients as ing ON id.ingredient_id = ing.ingredient_id
            JOIN dishes ON id.dish_id = dishes.dish_id;`;
    db.pool.query(query, function(err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

/* Update Queries */

// edit a dish
app.put('/editdish', function(req, res) {
    let dishID = req.body.dish_id;
    let dishName = req.body.dish_name;
    let cookingMethod = req.body.cooking_method;
    let complexity = req.body.complexity;
    let cookTime = req.body.cook_time;
    let cuisineID = req.body.cuisine_id;
    let categoryID = req.body.category_id;
    query = `UPDATE dishes
            SET dish_name = '${dishName}', cooking_method = '${cookingMethod}', complexity = '${complexity}', cook_time = ${cookTime},
            cuisine_id = ${cuisineID}, category_id = ${categoryID}
            WHERE dish_id = ${dishID};`;
    db.pool.query(query);
});

// edit a cuisine
app.put('/editcuisine', function(req, res) {
    let cuisineID = parseInt(req.body.cuisine_id)
    let cuisineName = req.body.cuisine_name
    let ingredientList = req.body.staple_ingredient_list
    query = `UPDATE cuisines
            SET cuisine_name = '${cuisineName}', staple_ingredient_list = '${ingredientList}'
            WHERE cuisine_id = ${cuisineID}`;
    db.pool.query(query);
});

/* Delete Queries */

// delete a dish
app.put('/deletedish', function(req, res) {
    let dishID = req.body.dish_id
    query = `DELETE FROM dishes
            WHERE dish_id = ${dishID};`;
    db.pool.query(query);
});

// delete an ingredient
app.put('/deleteingredient', function(req, res) {
    let ingredientID = req.body.ingredient_id
    query = `DELETE FROM ingredients
            WHERE ingredient_id = ${ingredientID};`;
    db.pool.query(query);
});


app.listen(9005);
