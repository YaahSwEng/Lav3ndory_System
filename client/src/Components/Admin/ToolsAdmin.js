import { useEffect } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { getTools } from "../../Features/ToolSlice";

import { useNavigate } from "react-router-dom";

import { deleteTool } from "../../Features/ToolSlice";
import { useLocation } from "react-router-dom";


const ToolsAdmin = () => {
    //
    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const tools = useSelector((state) => state.tools.tools);

    useEffect(() => {

        dispatch(getTools());

    }, [dispatch, location.pathname]);





    const handleDeleteTool = async (toolid) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this tool?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await dispatch(deleteTool(toolid)).unwrap();

            alert("Tool Deleted Successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to delete tool.");

        }

    };


    return (
        <Container fluid className="tools-admin-page">
            <div className="tools-admin-header">
                <h1>Manage Tools</h1>
                <Button

                    className="add-new-tool-btn"

                    onClick={() => navigate("/addtool")}
                >

                    + Add New Tool
                </Button>
            </div>
            <Row>

                {tools.map((tool) => (
                    <Col md={3} className="mb-4" key={tool._id}>
                        <div className="tool-card">
                            <div className="tool-img-box">
                                <img

                                   src={`${process.env.REACT_APP_SERVER_URL}/uploads/${tool.image}`}

                                    alt={tool.toolname}

                                    className="tool-img"

                                />
                            </div>

                            <div className="tool-card-body">
                                <h3>{tool.toolname}</h3>
                                <p>{tool.description}</p>
                                <div className="tool-tags">
                                    <span>{tool.condition}</span>
                                    <span>{tool.category}</span>
                                    <span>{tool.availability}</span>
                                </div>
                                <h4>{tool.price} OMR</h4>
                                <div className="tool-actions">
                                    <Button

                                        className="tool-update-btn"

                                        onClick={() => navigate("/updatetool", { state: { tool: tool } })}
                                    >

                                        Update
                                    </Button>

                                    <Button

                                        className="tool-delete-btn"

                                        onClick={() => handleDeleteTool(tool.toolid)}
                                    >

                                        Delete
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </Col>

                ))}
            </Row>
        </Container>

    );

};

export default ToolsAdmin;
