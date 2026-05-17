//package imports 
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminDashboard from "./Components/Admin/AdminDashboard";

import UserDashboard from "./Components/Users/UserDashboard";
import User from "./Components/Users/User";
import UserProfile from "./Components/Users/UserProfile";
import AddTool from "./Components/Admin/AddTool";
import ToolsAdmin from "./Components/Admin/ToolsAdmin";
import UpdateTool from "./Components/Admin/UpdateTool";
import ManageUsers from "./Components/Admin/ManageUsers";
import ToolsPage from "./Components/Users/toolpage";
import RequestTool from "./Components/Users/requesttool";
import InvoicePage from "./Components/Users/InvoicePage";




const App = () => {
  return (
    <Container fluid>
      <Router>
        <Row>
          <Header />
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user_profile" element={<UserProfile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/admin_dashboard" element={<AdminDashboard />}></Route>
            <Route path="/user_dashboard" element={<UserDashboard />}></Route>
            <Route path="/addtool" element={<AddTool />} />
            <Route path="/toolsadmin" element={<ToolsAdmin />} />
            <Route path="/updatetool" element={<UpdateTool />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/tools" element={<ToolsPage />}></Route>
            <Route path="/request-tool/:toolid" element={<RequestTool />}/>
            <Route path="/invoice" element={<InvoicePage />} />





          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Router>
    </Container>

  );
}
export default App;