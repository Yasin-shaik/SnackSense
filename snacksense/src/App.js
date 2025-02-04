import "./App.css";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ScanQR from "./Pages/ScanQR";
import Results from "./Pages/Results";
import Details from "./Pages/Details";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const [product, setProduct] = useState(null);
  const [user,setUser]=useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register setUser={setUser}/>} />
          <Route exact path="/login" element={<Login product={product}/>}/>
          <Route exact path="/scanQR" element={<ScanQR setProduct={setProduct} />} />
          <Route exact path="/results" element={<Results product={product}/>}/>
          <Route exact path="/details" element={<Details user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
