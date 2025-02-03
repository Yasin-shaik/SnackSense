import "./App.css";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ScanQR from "./Pages/ScanQR";
import Results from "./Pages/Results";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [product, setProduct] = useState(null);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login onLogin={handleLogin} product={product}/>}/>
          <Route exact path="/scanQR" element={<ScanQR setProduct={setProduct} token={token} />} />
          <Route exact path="/results" element={<Results product={product}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
