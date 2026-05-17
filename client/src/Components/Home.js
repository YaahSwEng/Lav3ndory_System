//import heroImg from "../Images/hero.png";
import { Row, Col } from "reactstrap";
import Login from "./Login";
import { FaLeaf, FaUsers } from "react-icons/fa";
import CommentList from "./CommentList";
import "../App.css";

import introImg from "../Images/default-main.png";

const Home = () => {
    return (
        <>
            <div className="home-page">
                <Row className="main-home-row">
                    <Col md={4}>
                        <div className="story-card">
                            <h4 className="home-subtitle">Lavender Story:</h4>
                            <h1 className="home-title">A Life Full of Inspiration</h1>

                            <p className="home-text">
                                At “Lavendory”, we redefine inclusivity with innovative tools
                                designed to enrich and enhance lives.
                            </p>

                            <p className="home-text">
                                We believe that empowerment is the key to making a real
                                difference, and we strive to make independence and accessibility
                                a tangible reality.
                            </p>

                            <p className="home-text">
                                Join us on our journey to create a harmonious environment that
                                prioritizes the needs of everyone.
                            </p>
                        </div>
                    </Col>

                    <Col md={8}>
                        <Login />
                    </Col>
                </Row>

                <Row className="about-section">
                    <Col md={12}>
                        <div className="about-card">
                            <h2 className="section-title">About Us</h2>

                            <p className="section-text">
                                At Lavendory, we are dedicated to empowering individuals with
                                innovative tools and services to enrich their lives.
                            </p>

                            <div className="lavender-line">
                                <span></span>

                                <div className="leaf-icon">
                                    <FaLeaf />
                                </div>

                                <span></span>
                            </div>

                            <h3 className="team-title">Team Members</h3>

                            <div className="team-list">
                                <div className="member-item">
                                    <FaUsers className="member-icon" />
                                    <p>Yaqeen Al Ghafri</p>
                                </div>

                                <div className="member-item">
                                    <FaUsers className="member-icon" />
                                    <p>Abrar Al Abri</p>
                                </div>

                                <div className="member-item">
                                    <FaUsers className="member-icon" />
                                    <p>Noura Al Naimi</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <CommentList />
                </Row>
            </div>
        </>
    );
};

export default Home;