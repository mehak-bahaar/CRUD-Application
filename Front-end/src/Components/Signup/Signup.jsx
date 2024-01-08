import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css"

const Signup = (props) => {
  //destructuring props
  const { dark } = props;
  //useNavigate hool
  let navigate = useNavigate();
  //adding form validation on frontend
  const [validated, setValidated] = useState(false);
  const handelValidation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };
  //show and hide password functionality
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  //state for storing the input cradentials
  const [cred, setCred] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //handelling form submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, userName } = cred;
    try {
      // validation checks
      handelValidation(e);
      if (
        validated
        ) {
          console.error("Please check your inputs and try again.");
          return;
        }
        //api call
      let response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert('Your account has been successfully created','info')
      } else {
        props.showAlert('invalid cradentials','danger')
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  // handeling changing the iput fields
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
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
          className="Auth-form needs-validation"
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
              Signup To INotebook
            </h3>
            <div className="form-group mt-3">
              <label
                style={{
                  color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)",
                }}
                for="validationCustom01"
              >
                name
              </label>
              <input
                value={cred.name}
                onChange={onChange}
                id="validationCustom01"
                name="name"
                type="name"
                className={`form-control mt-1 ${
                  validated && cred.password.length < 1 ? "is-invalid" : ""
                }`}
                placeholder="Enter name"
                style={{
                  backgroundColor: dark
                    ? "rgb(34, 34, 34)"
                    : " rgba(196, 192, 192, 0.6)",
                  color: dark ? "white" : "black",
                }}
              />
              <div className="invalid-feedback">
                Name field cannot be empty.
              </div>
            </div>
            <div className="form-group mt-3">
              <label
                style={{
                  color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)",
                }}
                htmlFor="userName"
              >
                Username
              </label>
              <input
                required
                minLength="5"
                value={cred.userName}
                onChange={onChange}
                id="userName"
                name="userName"
                type="text"
                className={`form-control mt-1 ${
                  validated && cred.password.length < 5 ? "is-invalid" : ""
                }`}
                placeholder="Enter userName"
                style={{
                  backgroundColor: dark
                    ? "rgb(34, 34, 34)"
                    : " rgba(196, 192, 192, 0.6)",
                  color: dark ? "white" : "black",
                }}
              />
              <div className="invalid-feedback">
                Username must be at least 5 characters.
              </div>
            </div>
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
                required
                minLength="5"
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
            <div className="form-group mt-3 password">
              <label
                style={{
                  color: dark ? "rgb(170, 165, 165)" : "rgb(34, 34, 34)",
                }}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                required
                minLength="5"
                value={cred.confirmPassword}
                onChange={onChange}
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className={`form-control mt-1 ${
                  (validated && cred.confirmPassword !== cred.password) ||
                  cred.confirmPassword > 5
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Confirm password"
                style={{
                  backgroundColor: dark
                    ? "rgb(34, 34, 34)"
                    : " rgba(196, 192, 192, 0.6)",
                  color: dark ? "white" : "black",
                }}
              />
              <div className="invalid-feedback">Passwords must match.</div>
            </div>
            <div className="form-group mt-2">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Singup
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

export default Signup
