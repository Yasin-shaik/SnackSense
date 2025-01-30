import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../Api.js"
import { ToastContainer, toast } from 'react-toastify';
export default function Register() {
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[repeat,setRepeat]=useState('');
  const navigate = useNavigate();
  const register=async()=>{
      if(!name || !email || !password || !repeat)
        toast.warning("Fill all the required fields");
      if(password!==repeat)
        toast.warning("Password & confirm password not matched");
      if(password.length<8)
        toast.warning("Password shoulde be more than 8 characters");
      try {
        await axios.post("/auth/register",{name,email,password});
        toast.success("Registration successful");
        setTimeout(()=>{
          navigate("/login");
        },2000);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
  }
  return (
    <div method="post" className="form">
        <ToastContainer position="top-center" theme="light" />
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: "25px"}}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="text" value={name} id="form3Example1c" className="form-control" onChange={(e)=>{setName(e.target.value)}}/>
                              <label className="form-label" htmlFor="userName">Your Name</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="email" value={email} id="form3Example3c" className="form-control" onChange={(e)=>{setEmail(e.target.value)}}/>
                              <label className="form-label" htmlFor="userEmail">Your Email</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="password" value={password} id="form3Example4c" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                              <label className="form-label" htmlFor="userPassword">Password</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="password" value={repeat} id="form3Example4cd" className="form-control" onChange={(e)=>{setRepeat(e.target.value)}}/>
                              <label className="form-label" htmlFor="repeatPassword">Repeat your password</label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button onClick={register}  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
