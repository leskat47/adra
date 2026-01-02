import { Routes, Route } from "react-router-dom";
import RecipeIndex from "./RecipeIndex";
import RecipeShow from "./RecipeShow";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeIndex />} />
      <Route path="/recipes/:id" element={<RecipeShow />} />
    </Routes>
  );
}
