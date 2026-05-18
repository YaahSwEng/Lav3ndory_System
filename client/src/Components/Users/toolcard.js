import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../Features/ToolSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "../data/toolcard.css";

const ToolCard = ({ tool }) => {
  const dispatch = useDispatch();

  // Logged in user
  const user = useSelector((state) => state.users.user);

  // Check if user liked tool
  const isLiked = tool.likedUsers?.includes(user?.email);



  return (
    <div className="tool-card">
      <div className="tool-img-box">
        <img

          src={`${process.env.REACT_APP_SERVER_URL}/uploads/${tool.image}`}

          alt={tool.toolname}

        />

        <span className="heart" onClick={() => dispatch(
          toggleLike({
            id: tool._id, email: user.email,
          })
        )
        }
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </span>
      </div>

      <div className="tool-info">
        <h3>{tool.toolname}</h3>

        <p className="tool-desc">{tool.description}</p>

        <div className="tool-meta">
          <span>{tool.condition}</span>
          <span>{tool.category}</span>
        </div>

        <div className="price-row">
          <strong>{tool.price} OMR</strong>
          <span>{tool.likes} likes</span>
        </div>

        <p
          className={
            tool.availability === "Available"
              ? "available"
              : "not-available"
          }
        >
          {tool.availability}
        </p>

        <Link

          to={`/request-tool/${tool.toolid}`}

          state={{ selectedTool: tool }}

          className="rent-btn"
        >

          Rent / Buy
        </Link>

      </div>
    </div>
  );
}

export default ToolCard;
