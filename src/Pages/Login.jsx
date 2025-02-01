import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from "../Api";
import '../Assets/CSS/Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const login = async () => {
    if (!email || !password)
      console.log('Enter all the fields required');
    const errors = { msg: '' };
    if (password.length < 3) {
      errors.msg = 'Password too short';
      return errors;
    }
    try {
      const data = { Email: email, Password: password };
      await api.post("/api/auth/login", data);
      toast.success('Login successful');
      navigate('/profile'); // Use navigate for redirect
    } catch (error) {
      errors.msg = error.response.data.msg;
      return errors;
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              className="img-fluid" 
              alt="Sample" 
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1 className="text-center mb-4">Login</h1>
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); }}
                />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <a href="#!" className="text-body">Forgot password?</a>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={login}
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account? 
                    <Link to="/register" className="link-danger">Register</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
