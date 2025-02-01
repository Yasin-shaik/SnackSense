import './App.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Navbar from './Components/Navbar'
import Footer from './Components/footer'

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
