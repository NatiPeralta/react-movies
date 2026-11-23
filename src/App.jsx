import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Favorites from "./pages/Favorites.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}