import { FC } from "react";
import RecipeCard from "./recipeCard";

export default function Feed() {
  return (
    <div className="flex flex-row gap-5 flex-wrap  p-20">
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
      <RecipeCard src="/uploads/Eggplant-Parmigiana_1.jpg" alt="qwe" />
    </div>
  );
}
