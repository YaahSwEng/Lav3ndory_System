import { useParams, useNavigate, useLocation } from "react-router-dom";
 
import { useSelector, useDispatch } from "react-redux";
 
import { useState, useEffect } from "react";
 
import { getTools } from "../../Features/ToolSlice";
 
import "../data/requesttool.css";
 
const RequestTool = () => {
 
  const dispatch = useDispatch();
 
  // Get logged-in user
 
  const user = useSelector((state) => state.users.user);
 
  // Get tool id from URL
 
  const { toolid } = useParams();
 
  // Navigation
 
  const navigate = useNavigate();
 
  // Receive selected tool from ToolCard
 
  const location = useLocation();
 
  // Get all tools from Redux store
 
  const tools = useSelector((state) => state.tools.tools);
 
  useEffect(() => {
 
    if (!tools || tools.length === 0) {
 
      dispatch(getTools());
 
    }
 
  }, [dispatch, tools]);
 
  // Find selected tool
 
  const selectedTool =
 
    location.state?.selectedTool ||
 
    tools.find((tool) => tool.toolid === toolid);
 
  // Form states
 
  const [fullname, setFullname] = useState(user?.name || "");
 
  const [phone, setPhone] = useState(user?.phone || "");
 
  const [requestType, setRequestType] = useState("Rent");
 
  const [notes, setNotes] = useState("");
 
  // If tool not loaded yet
 
  if (!selectedTool) {
 
    return <h2>Loading tool...</h2>;
 
  }
 
  // Submit request form
 
  const handleSubmit = (e) => {
 
    e.preventDefault();
 
    navigate("/invoice", {
 
      state: {
 
        fullname,
 
        phone,
 
        requestType,
 
        selectedTool,
 
        notes,
 
      },
 
    });
 
  };
 
 
 
  return (
    <div className="request-page">
      <div className="request-card">
        <div className="request-image">
          <img
 
            src={`http://localhost:3001/uploads/${selectedTool.image}`}
 
            alt={selectedTool.toolname}
 
          />
        </div>
        <div className="request-info">
          <h1>{selectedTool.toolname}</h1>
          <p className="request-desc">{selectedTool.description}</p>
          <div className="request-meta">
            <span>{selectedTool.condition}</span>
            <span>{selectedTool.category}</span>
          </div>
          <h2>{selectedTool.price} OMR</h2>
 
          <form className="request-form" onSubmit={handleSubmit}>
 
            {/* Full Name */}
            <input
 
              type="text"
 
              className="main-input"
 
              value={fullname}
 
              onChange={(e) => setFullname(e.target.value)}
 
              required
 
            />
 
            {/* Phone Number */}
            <input
 
              type="text"
 
              className="main-input"
 
              value={phone}
 
              onChange={(e) => setPhone(e.target.value)}
 
              required
 
            />
 
            {/* Request Type */}
            <select
 
              className="main-input"
 
              value={requestType}
 
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option>Rent</option>
              <option>Buy</option>
            </select>
 
            {/* Additional Notes */}
            <textarea
 
              className="main-input"
 
              placeholder="Additional Notes"
 
              rows="4"
 
              value={notes}
 
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
 
            {/* Submit Button */}
            <button
 
              type="submit"
 
              className="primary-btn"
            >
 
              Submit Request
            </button>
          </form>
 
        </div>
      </div>
    </div>
 
  );
 
};
 
export default RequestTool;
 
 