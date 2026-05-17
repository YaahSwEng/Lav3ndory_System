import { Link } from "react-router-dom";
import { Col, Container, Form, Row, Label, Input, Button } from "reactstrap";
import introImg from "../Images/default-main.png";
// Importing 'useState' from React to manage form input data (email and password) in this component.
import { useState } from "react";
// Importing 'useDispatch' from Redux to send actions (like logging in) to the Redux store.
import { useDispatch } from "react-redux";
// Importing the 'login' action from the UserSlice file, which handles the login logic in Redux.
import { login } from "../Features/UserSlice";
// Importing 'useSelector' to access parts of the Redux store (like user data or login status).
import { useSelector } from "react-redux";
// Importing 'useEffect' to run code when certain values (like login success or failure) change.
import { useEffect } from "react";
// Importing 'useNavigate' to programmatically redirect the user to different pages (e.g., home page after login).
import { useNavigate } from "react-router-dom";
import "../App.css";




const Login = () => {
  const [email, setemail] = useState("Lav3@yahoo.com"); // Initial email
  const [password, setpassword] = useState("Lav3@2003"); // Initial password

  const [loginClicked, setLoginClicked] = useState(false);

  // 'useDispatch' gives us a function to send actions to the Redux store.
  const dispatch = useDispatch();
  // 'useNavigate' gives us a function to redirect the user to other routes.
  const navigate = useNavigate();
  // Using 'useSelector' to get data from the Redux store.
  // Here, we're accessing the 'user' object, 'isSuccess', and 'isError' from the 'users' slice.
  // These tell us if the user is logged in, if the login was successful, or if there was an error.


  const user = useSelector((state) => state.users.user); // The logged-in user's data
  const isSuccess = useSelector((state) => state.users.isSuccess); // True if login worked
  const isError = useSelector((state) => state.users.isError); // True if login failed
  const isLoading = useSelector((state) => state.users.isLoading); // True if login is in progress  
  // A function to handle the login process when the user clicks the "Login" button.
  const handleLogin = () => {

    setLoginClicked(true);


    // ثابتات الأدمن
    const ADMIN_EMAIL = "admin@lavendory.com";
    const ADMIN_PASSWORD = "Admin@123";

    // إذا الأدمن
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

      navigate("/admin_dashboard");

    } else {

      // المستخدم العادي
      const userData = {
        email: email,
        password: password,
      };

      dispatch(login(userData));
    }
  };
  // 'useEffect' runs code when certain values change (listed in the dependency array).
  // Here, it checks if the login failed or succeeded and redirects the user accordingly.
  useEffect(() => {

    if (loginClicked && isError) {
      navigate("/login");
    }

    if (loginClicked && isSuccess) {
      navigate("/user_dashboard");
    }

  }, [loginClicked, isError, isSuccess, navigate]);



  return (
    <Container fluid className="login-container">
      <Row className="login-card">
        <Col md={7}>
          <div className="login-image-box">
            <img src={introImg} alt="Lavendory" className="login-img" />
          </div>
        </Col>

        <Col md={5}>
          <Form className="login-form">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Login to your Lavendory account</p>

            {isError && (
              <p className="error">Login Failed. Please try again.</p>
            )}

            {isSuccess && (
              <p className="success">Login Successful! Redirecting...</p>
            )}

            {isLoading && <p className="loading">Logging in...</p>}

            <Label className="login-label">Email</Label>
            <Input
              className="login-input"
              id="email"
              name="email"
              value={email}
              type="email"
              placeholder="Enter Email..."
              onChange={(e) => setemail(e.target.value)}
            />

            <Label className="login-label">Password</Label>
            <Input
              className="login-input"
              id="password"
              name="password"
              value={password}
              type="password"
              placeholder="Enter Password..."
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="button"
              className="login-btn"
              onClick={() => handleLogin()}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <p className="smalltext">
              No Account? <Link to="/register">Sign Up Now.</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;