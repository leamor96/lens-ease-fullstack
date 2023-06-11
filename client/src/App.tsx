import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar"; 
import AuthContext from "./context/AuthContext"; 
import About from "./routes/About"; 
import Home from "./routes/Home"; 
import Login from "./routes/Login"; 
import Register from "./routes/Register"; 
import AlgorithmPage from "./components/algorithm/AlgorithmPage";
import SingleVisionForm from "./components/forms/SingleVisionForm";
import ProgressiveForm from "./components/forms/ProgressiveForm";
import LensOptionsPage from "./components/lenses/LensOptionsPage";
import Favorites from "./components/cards/Favorites";
import CardList from "./components/cards/CardList";
import Footer from "./components/footer/Footer";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/algorithm/*" element={<AlgorithmPage />} />
        <Route path="/algorithm/single" element={<SingleVisionForm />} />
        <Route path="/algorithm/Progressive" element={<ProgressiveForm />} />
        <Route path="/lens-options" element={<LensOptionsPage />} />
        {isLoggedIn && <Route path="/favorites" element={<Favorites />} />}
        {isLoggedIn && <Route path="/card-list" element={<CardList/>} />}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
