import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/create-todo/:todoId" element={<CreateToDo />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
