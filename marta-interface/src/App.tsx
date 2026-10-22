import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LinesPage from "./pages/LinesPage";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:color" element={<LinesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;