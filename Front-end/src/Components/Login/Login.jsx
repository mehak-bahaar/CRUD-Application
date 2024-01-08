import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
  //destructuring props
    const {dark} = props
    //useNavigate hook
    let navigate = useNavigate()
    //handeling password show and hide
     const [showPassword, setShowPassword] = useState(false);
     const togglePasswordVisibility = () => setShowPassword(!showPassword);
     //setting up frontend form validation
       const [validated, setValidated] = useState(false);
       const handelValidation = (e) => {
         const form = e.currentTarget;
         if (form.checkValidity() === false) {
           e.preventDefault();
           e.stopPropagation();
         }
         setValidated(true);
       };
      //setting up state to store input cradentials
           const [cred, setCred] = useState({ email: "", password: "" });
       //handeling form submition
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        // validation checks
        handelValidation(e);
        if (validated) {
          console.error("Please check your inputs and try again.");
          return;
        }
        //api call
        let response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cred.email, password: cred.password }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        if (json.success) {
          localStorage.setItem("token", json.authToken);
          navigate("/");
          props.showAlert("You are logged in your account successfully.", "info");
        } else if (json.success == false) {
          props.showAlert("Invalid Cradentials", "danger");
              }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    //handelign chang in input field
    const onChange = (e) =>{
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
  return (
    <div
      className={` text-${dark ? "light" : "dark"} container`}
      style={{ minHeight: "100vh", backgroundColor: dark ? "black" : "white" }}
    >
      <div className="Auth-form-container">
        <form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="Auth-form"
          style={{
            backgroundColor: dark ? "black" : "white",
            color: dark ? "white" : "black",
            boxShadow: dark
              ? "white 1px 1px 10px"
              : "rgb(0 0 0 / 16%) 1px 1px 10px",
          }}
        >
          <div className="Auth-form-content">
            <h3
              className="Auth-form-title"
              style={{ color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)" }}
            >
              Login To INotebook
            </h3>
            <div className="form-group mt-3">
              <label
                style={{
                  color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)",
                }}
                htmlFor="email"
              >
                Email address
              </label>
              <input
                value={cred.email}
                onChange={onChange}
                id="email"
                name="email"
                type="email"
                className={`form-control mt-1 ${
                  validated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cred.email)
                    ? "is-invalid"
                    : ""
                } `}
                placeholder="Enter email"
                style={{
                  backgroundColor: dark
                    ? "rgb(34, 34, 34)"
                    : " rgba(196, 192, 192, 0.6)",
                  color: dark ? "white" : "black",
                }}
              />
              <div className="invalid-feedback">
                Please enter a valid email.
              </div>
            </div>
            <div className="form-group mt-3 password">
              <label
                style={{
                  color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)",
                }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={cred.password}
                onChange={onChange}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`form-control mt-1 ${
                  validated && cred.password.length < 5 ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                style={{
                  backgroundColor: dark
                    ? "rgb(34, 34, 34)"
                    : " rgba(196, 192, 192, 0.6)",
                  color: dark ? "white" : "black",
                }}
              />
              <div className="invalid-feedback">
                Password must be at least 5 characters.
              </div>
              <i
                onClick={togglePasswordVisibility}
                className={`fa ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute`}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="form-group mt-2">
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Log In
              </button>
            </div>
            {/* <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
