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

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path="/about" element={<About />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/algorithm" element={<AlgorithmPage/>}/>
      </Routes>
    </>
  );
}

export default App;
