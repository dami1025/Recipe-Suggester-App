import React from "react";

function HomePage() {

  return (
    <>
      <h2>Home Page</h2>
      <article>
      Oftentimes when it’s time to make lunch or dinner we do not know what we want to make with what we have in the fridge. 
      Our database driven website will allow you to choose ingredients and it will suggest dishes to make based on those ingredients. 
      The purpose of the web is to allow those busy users to specify what course they’re looking for as well as what type of cuisine 
      in a short time. The database will start with 20 dishes to suggest, with the ability to add more. The database will also start 
      with 10 “main” ingredients. For example, we might have chicken and salad mix in the fridge. We’ll tell the website that we have 
      chicken and salad mix and we want something that takes under 15 minutes to make. We’ll then return a caesar salad as the suggestion 
      for what to make.
      </article>
    </>
  );
}

export default HomePage;