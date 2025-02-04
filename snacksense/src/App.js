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
  const [product, setProduct] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login product={product}/>}/>
          <Route exact path="/scanQR" element={<ScanQR setProduct={setProduct} />} />
          <Route exact path="/results" element={<Results product={product}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
