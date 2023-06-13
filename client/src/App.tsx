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
import ProLensOptions from "./components/lenses/ProLensOptions";
import ProCardList from "./components/cards/pro-cards/ProCardList";
import Lenses from "./routes/Lenses";
import jwt_decode from "jwt-decode";


function App() {


  const { isLoggedIn } = useContext(AuthContext);
  const token: string | null = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    const decodedToken: { isAdmin: boolean } = jwt_decode(token);
    isAdmin = decodedToken.isAdmin;
  }
  console.log(isAdmin);
  

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
        <Route path="/pro-lens-options" element={<ProLensOptions />} />
        {isLoggedIn && <Route path="/favorites" element={<Favorites />} />}
        {isLoggedIn && <Route path="/lenses/*" element={<Lenses />} />}
        {isLoggedIn && (
          <Route path="/lenses/card-list" element={<CardList />} />
        )}
        {isLoggedIn && (
          <Route path="/lenses/pro-card-list" element={<ProCardList />} />
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
