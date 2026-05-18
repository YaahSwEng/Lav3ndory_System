import { Container, Row, Col } from "reactstrap";
import { FaUsersCog, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import User from "../User";

//to put the count of users and tools 
import axios from "axios";
import { useEffect, useState } from "react";


const AdminDashboard = () => {
  const navigate = useNavigate();
  //to put the count of users and tools 
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [usersCount, setUsersCount] = useState(0);

  const [toolsCount, setToolsCount] = useState(0);
  useEffect(() => {

    const fetchCounts = async () => {

      try {

        const usersResponse = await axios.get(`${SERVER_URL}/usersCount`);
;

        const toolsResponse = await axios.get(`${SERVER_URL}/toolsCount`);

        setUsersCount(usersResponse.data.count);

        setToolsCount(toolsResponse.data.count);

      } catch (error) {

        console.log(error);

      }

    };

    fetchCounts();

  }, []);


  return (
    <Container fluid className="admin-dashboard-page">
      <Row className="admin-dashboard-row">

        {/* LEFT SIDE */}
        <Col md={4}>
          <div className="admin-profile-card">

            {/* <User /> */}

            <h2 className="admin-side-title">
              Administrator Panel
            </h2>

            <p className="admin-side-text">
              Welcome to the Lavendory administration dashboard.
              Manage users, tools, and platform services from one
              centralized panel.
            </p>

            <div className="admin-side-box">

              <h4>Quick Access</h4>

              <ul className="admin-side-list">
                <li>User Management</li>
                <li>Tools Control</li>
                <li>Platform Monitoring</li>
                <li>Admin Services</li>
              </ul>

            </div>

          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={8}>
          <div className="admin-main-card">

            <h1 className="admin-title">
              Admin Dashboard
            </h1>

            <p className="admin-subtitle">
              Manage Lavendory users, tools, and platform services.
            </p>

            {/* TOP STATS */}
            <Row className="admin-stats-row">

              <Col md={4}>
                <div className="admin-stat-box">
                  <h4>{usersCount}</h4>
                  <p>Registered Users</p>
                </div>
              </Col>

              <Col md={4}>
                <div className="admin-stat-box">
                  <h4>{toolsCount}</h4>
                  <p>Available Tools</p>
                </div>
              </Col>

              <Col md={4}>
                <div className="admin-stat-box">
                  <h4>24/7</h4>
                  <p>Platform Monitoring</p>
                </div>
              </Col>

            </Row>

            {/* ACTION CARDS */}
            <Row>

              <Col md={6}>
                <div
                  className="admin-action-card"
                  onClick={() => navigate("/users")}
                >

                  <div className="admin-icon-circle">
                    <FaUsersCog className="admin-card-icon" />
                  </div>

                  <h3>Manage Users</h3>

                  <p>
                    View, update, and manage registered users.
                  </p>

                </div>
              </Col>

              <Col md={6}>
                <div
                  className="admin-action-card"
                  onClick={() => navigate("/toolsadmin")}
                >

                  <div className="admin-icon-circle tools-circle">
                    <FaTools className="admin-card-icon green-icon" />
                  </div>

                  <h3>Manage Tools</h3>

                  <p>
                    Add, edit, and organize Lavendory tools.
                  </p>

                </div>
              </Col>

            </Row>

          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default AdminDashboard;