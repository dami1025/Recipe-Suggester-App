# Recipe-Suggester-App

Overview
Oftentimes when it’s time to make lunch or dinner we do not know what we want to make with what we have in the fridge. Our database driven website will allow you to choose ingredients and it will suggest dishes to make based on those ingredients. The purpose of the web is to allow those busy users to specify what course they’re looking for as well as what type of cuisine in a short time. The database will start with 20 dishes to suggest, with the ability to add more. The database will also start with 10 “main” ingredients. For example, we might have chicken and salad mix in the fridge. We’ll tell the website that we have chicken and salad mix and we want something that takes under 15 minutes to make. We’ll then return a caesar salad as the suggestion for what to make.
Database Outline

*ingredients: Track and describe the ingredients that we have available
- ingredient_id: int, auto_increment, not NULL, PK
- ingredient_name: varchar(50), not NULL
- ingredient_type: varchar(50), not NULL (meat, seafood, vegetable, dairy or spice)
- Relationship: M:M between ingredients and dishes

*ingredients_dishes: Intersection table for ingredients and dishes.
- ingredient_id: int, not NULL, PK, FK
- dish_id: int, not NULL, PK, FK
- Relationship: 1:M from ingredients_dishes to ingredients and 1:M from
ingredients_dishes to dishes.

*dishes: A collection of dishes from all over the world. Each dish will have one category and one cuisine type but can have many ingredients.
- dish_id: int, auto_increment, not NULL, PK
- dish_name: varchar(50), not NULL
- cooking_method: varchar(50)
- complexity: varchar(50), not NULL (easy, hard, medium, no cook)
- cook_time: int
- cuisine_id: int, FK
- category_id: int, not Null, FK
- Relationship: M:M between ingredients and dishes. M:1 between dishes and categories.
M:1 between dishes and cuisines.

*categories: Stores the values of a dish’s category (breakfast, lunch, etc.)
- category_id: int, auto_increment, not NULL, PK
- category_name: varchar(50), not NULL
- Relationship: M:1 between dishes and categories.

*cuisines: Stores the values of a dish’s cuisine (Chinese, Mexican, etc.)
- cuisine_id: int, auto_increment, not Null, PK
- cuisine_name: varchar(50), not Null
- staple_ingredient_list: varchar(255)
- Relationship: M:1 between dishes and cuisines.

### **_Picture screenshot of the UI web page_**

<img width="621" alt="Screenshot 2024-10-12 at 1 48 05 AM" src="https://github.com/user-attachments/assets/b8eff20e-8b26-4f17-b4ca-76ce80915088">
<img width="1336" alt="Screenshot 2024-10-12 at 1 48 21 AM" src="https://github.com/user-attachments/assets/aa75bb33-d387-4b37-ae68-2f22d6c9a738">
<img width="527" alt="Screenshot 2024-10-12 at 1 48 36 AM" src="https://github.com/user-attachments/assets/2cc747e9-090b-455b-b1b8-fc70895a0392">



