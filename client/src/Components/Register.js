import { Container, Input } from "reactstrap";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
// Importing 'useState' hook from React to manage form input values
import { useState } from "react";
// Importing the validation schema for the form (defines rules for valid input)
import { userSchemaValidation } from "../Validations/UserValidations";
// Importing 'yup' library, which helps define the validation rules
import * as yup from "yup";
// Importing 'useForm' from 'react-hook-form' to simplify form handling and validation
import { useForm } from "react-hook-form";
// Importing 'yupResolver' to connect 'yup' validation with 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
// Importing Redux hooks to interact with the Redux store
import { useSelector, useDispatch } from "react-redux";
// Importing action to register a new user
import { registerUser } from "../Features/UserSlice";
// Importing 'useNavigate' from 'react-router-dom' to redirect users after form submission
import { useNavigate } from "react-router-dom";
import "../App.css";

import introImg from "../Images/default-main.png";




const Register = () => {
    const userList = useSelector((state) => state.users.value);
    // useState hooks to manage form input values locally
    // Each input field has its own state
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [gender, setgender] = useState("");
    const [ageCategory, setageCategory] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(userSchemaValidation) });


    // useDispatch hook to dispatch Redux actions (like adding or updating users)
    const dispatch = useDispatch();

    // useNavigate hook to redirect the user to another page (e.g., login page)
    const navigate = useNavigate();

    // Function to handle form submission when the form is valid
    const onSubmit = (data) => {
        try {

            // 'data' contains all validated registration form values
            const userData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                ageCategory: data.ageCategory,
                password: data.password,
            };

            // Log the form data for debugging
            console.log("Form Data", data);

            // Show success message
            alert("Registration Successful.");

            // Dispatch the registerUser thunk to send data to backend
            dispatch(registerUser(userData));

            // Redirect user to login page after successful registration
            navigate("/login");

        } catch (error) {

            // Log any errors during form submission
            console.log("Error.");
        }
    };

return (
  <Container fluid className="register-page">
    <Row className="register-card">
      <Col md={6}>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">
            Join Lavendory and start your journey with us.
          </p>

          <label className="register-label">Full Name</label>
          <input
            name="name"
            id="name"
            className="register-input"
            type="text"
            placeholder="Enter your name..."
            {...register("name", {
              onChange: (e) => setname(e.target.value),
            })}
          />
          <p className="error">{errors.name?.message}</p>

          <label className="register-label">Email</label>
          <input
            name="email"
            id="email"
            className="register-input"
            type="text"
            placeholder="Enter your email..."
            {...register("email", {
              onChange: (e) => setemail(e.target.value),
            })}
          />
          <p className="error">{errors.email?.message}</p>

          <label className="register-label">Phone Number</label>
          <input
            name="phone"
            id="phone"
            className="register-input"
            type="tel"
            placeholder="Enter your phone number..."
            {...register("phone", {
              onChange: (e) => setphone(e.target.value),
            })}
          />
          <p className="error">{errors.phone?.message}</p>

          <div className="gender-box">
            <label className="register-label">Gender</label>

            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  value="Female"
                  {...register("gender", {
                    onChange: (e) => setgender(e.target.value),
                  })}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  value="Male"
                  {...register("gender", {
                    onChange: (e) => setgender(e.target.value),
                  })}
                />
                Male
              </label>
            </div>

            <p className="error">{errors.gender?.message}</p>
          </div>

          <label className="register-label">Age Category</label>
          <select
            name="ageCategory"
            id="ageCategory"
            className="register-input"
            {...register("ageCategory", {
              onChange: (e) => setageCategory(e.target.value),
            })}
          >
            <option value="">Select age category...</option>
            <option value="under18">Under 18</option>
            <option value="18-25">18 - 25</option>
            <option value="26-35">26 - 35</option>
            <option value="36-45">36 - 45</option>
            <option value="46plus">46+</option>
          </select>
          <p className="error">{errors.ageCategory?.message}</p>

          <label className="register-label">Password</label>
          <input
            name="password"
            id="password"
            className="register-input"
            type="password"
            placeholder="Enter your password..."
            {...register("password", {
              onChange: (e) => setpassword(e.target.value),
            })}
          />
          <p className="error">{errors.password?.message}</p>

          <label className="register-label">Confirm Password</label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            className="register-input"
            type="password"
            placeholder="Confirm your password..."
            {...register("confirmPassword", {
              onChange: (e) => setconfirmPassword(e.target.value),
            })}
          />
          <p className="error">{errors.confirmPassword?.message}</p>

          <Button className="register-btn" type="submit">
            Register
          </Button>

          <p className="smalltext">
            Already have an account? <Link to="/login">Login Now.</Link>
          </p>
        </form>
      </Col>

      <Col md={6}>
        <div className="register-image-section">
          <div className="register-circle">
            <img
              src={introImg}
              alt="Lavendory Register"
              className="register-img"
            />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);
};

export default Register;