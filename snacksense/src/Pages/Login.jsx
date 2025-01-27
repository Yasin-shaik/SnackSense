import React, { useState } from 'react'
import '../Assets/CSS/Login.css'
export default function Login() {
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const handleSubmit=()=>{
    console.log(email);
    console.log(password);
  }
  return (
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample"/>
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="form3Example3" class="form-control form-control-lg" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <label class="form-label" for="form3Example3">Email address</label>
              </div>
              <div data-mdb-input-init class="form-outline mb-3">
                <input type="password" id="form3Example4" class="form-control form-control-lg" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <label class="form-label" for="form3Example4">Password</label>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <a href="#!" class="text-body">Forgot password?</a>
                <div class="text-center text-lg-start mt-4 pt-2">
                <button onClick={handleSubmit}  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg" style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" class="link-danger">Register</a></p>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
