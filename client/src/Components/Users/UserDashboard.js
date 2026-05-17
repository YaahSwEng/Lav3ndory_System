import { Container, Row, Col } from "reactstrap";
import { FaTools, FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux"; //to bring the logged in user
import User from "./User";





const UserDashboard = () => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);

  return (
    <Container fluid className="user-dashboard-page">

      <Row className="user-dashboard-row">

        {/* LEFT SIDE */}
        <Col md={4}>
          <div className="user-profile-card">

            <User />

          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={8}>
          <div className="user-main-card">

            <h1 className="user-title">
              Welcome, {user?.name}
            </h1>

            <p className="user-subtitle">
              Access your tools and manage your service information.
            </p>


            {/* ACTION CARDS */}
            <Row>

              <Col md={6}>
                <div
                  className="user-action-card"
                  onClick={() => navigate("/tools")}
                >

                  <div className="user-icon-circle">
                    <FaTools className="user-card-icon" />
                  </div>

                  <h3>Tools</h3>

                  <p>
                    Access and explore your available Lavendory tools.
                  </p>

                </div>
              </Col>

              <Col md={6}>
                <div
                  className="user-action-card"
                  onClick={() => navigate("/billing")}
                >

                  <div className="user-icon-circle billing-circle">
                    <FaFileInvoiceDollar className="user-card-icon green-icon" />
                  </div>

                  <h3>Billing & Services</h3>

                  <p>
                    View your subscribed services and billing information.
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

export default UserDashboard;