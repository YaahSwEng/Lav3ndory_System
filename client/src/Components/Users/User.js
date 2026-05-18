import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Location from "./Location";

const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);
  const phone = useSelector((state) => state.users.user.phone);
  const gender = useSelector((state) => state.users.user.gender);
  const ageCategory = useSelector((state) => state.users.user.ageCategory);
  const profilePic = useSelector((state) => state.users.user.profilePic);

  // Build full image URL
  const picURL = profilePic
    ? `${process.env.REACT_APP_SERVER_URL}/uploads/${profilePic}`
    : null;
  return (
    <div>
      {/* USER IMAGE */}
      {profilePic ? (
        <img
          src={picURL}
          className="userImage"
          alt="User"
        />
      ) : (
        <FaUserCircle className="userDefaultIcon" />
      )}

      <p>
        <b>{name}</b>
        <br />
        {email}
        <br />
        {phone}
        <br />
        {gender}
        <br />
        {ageCategory}
        <Location />
      </p>
    </div>
  );
};

export default User;