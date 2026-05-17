import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getTools } from "../../Features/ToolSlice";

import ToolCard from "./toolcard";

import "../data/toolpage.css";

import ShareComments from "./ShareComments";

const ToolsPage = () => {
 
  // Redux dispatch
  const dispatch = useDispatch();
 
  // Get tools from Redux store
  const tools = useSelector(
    (state) => state.tools.tools
  );
 
  // Load tools when page opens
  useEffect(() => {
    dispatch(getTools());
  }, [dispatch]);
 
  return (
 
    <div className="tools-page">
 
      <div className="tools-header">
 
        <h1>Explore Tools</h1>
 
        <p>Rent or buy the tool you need easily.</p>
 
      </div>
 
      <div className="tools-grid">
 
        {tools.map((tool) => (
 
          <ToolCard
            key={tool.toolid}
            tool={tool}
          />
 
        ))}
 
 
 
      </div>
 
       {/* Comments section BELOW tools */}
    <div className="comments-section">
      <ShareComments />
    </div>
 
    </div>
 
  );
}
 
export default ToolsPage;
 