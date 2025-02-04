import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../Api.js";
import "../Assets/CSS/Login.css";
export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("");
  const login = async () => {
    if (!email || !password) console.log("Enter all the fields required");
    const errors = { msg: "" };
    if (password.length < 3) {
      errors.msg = "password too short";
      return errors;
    }
    try {
      if(role==='User')
        await api.post("/auth/loginUser", { email, password });
      else
        await api.post("/auth/loginNutri", { email, password });
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className="vh-100">
      <ToastContainer position="top-center" theme="light" />
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
              <div className="align-items-center mb-3 ml-3">
                <label className="mb-2" style={{ marginLeft: "10px" }}>
                  Signup as:
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    className="w-full p-2 border rounded mt-1"
                    style={{ marginLeft: "10px" }}
                  >
                    <option value="User">User</option>
                    <option value="Nutritionist">Nutritionist</option>
                  </select>
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={login}
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
