import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Filtro from "./Pages/Filtro/Filtro";
import Error from "./Pages/Error/Error";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filtro" element={<Filtro />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
