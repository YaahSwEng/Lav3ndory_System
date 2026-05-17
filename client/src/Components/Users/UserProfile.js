import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import User from "./User";

import { updateUserProfile } from "../../Features/UserSlice";

import { useNavigate } from "react-router-dom";

import {

  Form,

  FormGroup,

  Input,

  Label,

  Button,

  Container,

  Row,

  Col,

} from "reactstrap";

const UserProfile = () => {

  const user = useSelector((state) => state.users.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user.name || "");

  const [phone, setPhone] = useState(user.phone || "");

  const [gender, setGender] = useState(user.gender || "");

  const [ageCategory, setAgeCategory] = useState(user.ageCategory || "");

  const [pwd, setPwd] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePic, setProfilePic] = useState("");

  const handleUpdate = async (event) => {

    event.preventDefault();

    if (pwd !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    const userData = {

      email: user.email,

      name: userName,

      phone: phone,

      gender: gender,

      ageCategory: ageCategory,

      password: pwd,

      profilePic: profilePic,

    };

    const result = await dispatch(updateUserProfile(userData));
    console.log("Update result:", result);
    alert("Profile Updated Successfully.");
    navigate("/user_dashboard");

  };

  useEffect(() => {

    if (!user.email) {

      navigate("/login");

    }

  }, [user.email, navigate]);

  return (
    <Container fluid className="profile-page">
      <Row className="profile-row">
        <Col md={3}>
          <div className="profile-user-card">
            <User />
          </div>
        </Col>
        <Col md={6}>
          <div className="profile-form-card">
            <h1 className="profile-title">Update Profile</h1>
            <p className="profile-subtitle">

              Manage and update your account information.
            </p>
            <Form onSubmit={handleUpdate}>
              <FormGroup>
                <Label for="profilePic">Profile Picture</Label>
                <Input

                  id="profilePic"

                  name="profilePic"

                  type="file"

                  onChange={(e) => setProfilePic(e.target.files[0])}

                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input

                  id="name"

                  name="name"

                  placeholder="Name..."

                  type="text"

                  value={userName}

                  onChange={(e) => setUserName(e.target.value)}

                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input

                  id="email"

                  name="email"

                  placeholder="Email..."

                  type="email"

                  value={user.email || ""}

                  disabled

                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input

                  id="phone"

                  name="phone"

                  placeholder="Phone Number..."

                  type="text"

                  value={phone}

                  onChange={(e) => setPhone(e.target.value)}

                />
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input

                  id="gender"

                  name="gender"

                  type="select"

                  value={gender}

                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender...</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="ageCategory">Age Category</Label>
                <Input

                  id="ageCategory"

                  name="ageCategory"

                  type="select"

                  value={ageCategory}

                  onChange={(e) => setAgeCategory(e.target.value)}
                >
                  <option value="">Select age category...</option>
                  <option value="under18">Under 18</option>
                  <option value="18-25">18 - 25</option>
                  <option value="26-35">26 - 35</option>
                  <option value="36-45">36 - 45</option>
                  <option value="46plus">46+</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input

                  id="password"

                  name="password"

                  placeholder="Password..."

                  type="password"

                  value={pwd}

                  onChange={(e) => setPwd(e.target.value)}

                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input

                  id="confirmPassword"

                  name="confirmPassword"

                  placeholder="Confirm Password..."

                  type="password"

                  value={confirmPassword}

                  onChange={(e) => setConfirmPassword(e.target.value)}

                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" className="profile-btn">

                  Update Profile
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>

  );

};

export default UserProfile;
