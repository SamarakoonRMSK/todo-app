import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UpdateToDo from "./pages/UpdateToDo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-todo/:todoId" element={<UpdateToDo />} />
      </Routes>
    </BrowserRouter>
  );
}
