//package imports 
import { Navbar, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/lavendory_logo.png";
import "../App.css";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";




const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {

        // Redux logout
        dispatch(logout());

        // Alert message
        alert("Logged out successfully");

        // Redirect to login page
        navigate("/login");
    };
    return (
        <>
            <Navbar className="header">
                <Nav className="nav-links">
                    <NavItem className="logo-item">
                        <img src={logo} className="logo" alt="Logo" />

                    </NavItem>
                    <NavItem className="brand-name">
                        <h1>LAVENDORY</h1>

                    </NavItem>

                    <NavItem className="nav-item-custom">
                        <Link to="/">Home</Link>

                    </NavItem>


                    <NavItem className="nav-item-custom">
                        <Link to="/login">Login</Link>

                    </NavItem>


                    <NavItem className="nav-item-custom">
                        <Link to="/user_profile">Profile</Link>


                    </NavItem>

                    {/* Logout Button */}
                    <NavItem className="nav-item-custom">

                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </>

    );
}
export default Header;