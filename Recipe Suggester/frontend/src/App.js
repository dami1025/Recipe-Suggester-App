import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components import
import Nav from './components/Nav.js';

// pages import
import HomePage from './pages/HomePage.js'
import DishesPage from './pages/DishesPage.js'
import CategoriesPage from './pages/CategoriesPage.js'
import CuisinesPage from './pages/CuisinesPage.js'
import IngredientsPage from './pages/IngredientsPage.js'
import IngredientsDishesPage from './pages/IngredientsDishesPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Recipe Suggester</h1>
        </header>
        
        <Nav />

        <main>
          <section>
            <Routes>
              <Route path="/" element = {<HomePage />} />
              <Route path="/dishes" element = {<DishesPage />} />
              <Route path="/ingredients" element = {<IngredientsPage />} />
              <Route path="/categories" element = {<CategoriesPage />} />
              <Route path="/cuisines" element = {<CuisinesPage />} />
              <Route path="/ingredientsdishes" element = {<IngredientsDishesPage />} />
            </Routes>
          </section>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
