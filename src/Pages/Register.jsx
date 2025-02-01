import React, { useState } from 'react'
import {redirect} from "react-router-dom";
import axios from "../Api.js"
import { ToastContainer, toast } from 'react-toastify';
export default function Register() {
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[repeat,setRepeat]=useState('');
  const register=async()=>{
      if(!name || !email || !password || !repeat)
        toast.warning("Fill all the required fields");
      if(password!==repeat)
        toast.warning("Password & confirm password not matched");
      const data={Name:name, Email:email, Password:password};
      try {
        await axios.post("/api/auth/register",data);
        toast.success("Registration successful");
        return redirect("/login");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
  }
  return (
    <form method="post" className="form">
        <ToastContainer position="top-center" theme="light" />
        <section class="vh-100" style={{backgroundColor: "#eee"}}>
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{borderRadius: "25px"}}>
                  <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                        <form class="mx-1 mx-md-4">
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                              <input type="text" value={name} id="form3Example1c" class="form-control" onChange={(e)=>{setName(e.target.value)}}/>
                              <label class="form-label" htmlFor="userName">Your Name</label>
                            </div>
                          </div>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                              <input type="email" value={email} id="form3Example3c" class="form-control" onChange={(e)=>{setEmail(e.target.value)}}/>
                              <label class="form-label" htmlFor="userEmail">Your Email</label>
                            </div>
                          </div>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                              <input type="password" value={password} id="form3Example4c" class="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                              <label class="form-label" htmlFor="userPassword">Password</label>
                            </div>
                          </div>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                              <input type="password" value={repeat} id="form3Example4cd" class="form-control" onChange={(e)=>{setRepeat(e.target.value)}}/>
                              <label class="form-label" htmlFor="repeatPassword">Repeat your password</label>
                            </div>
                          </div>
                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button onClick={register}  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                          </div>
                        </form>
                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </form>
  )
}
