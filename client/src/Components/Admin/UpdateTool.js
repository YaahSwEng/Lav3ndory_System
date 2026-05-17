import { useState } from "react";

import {

    Container,

    Row,

    Col,

    Form,

    FormGroup,

    Label,

    Input,

    Button,

} from "reactstrap";

import { useDispatch } from "react-redux";

import { updateTool } from "../../Features/ToolSlice";

import { useNavigate, useLocation } from "react-router-dom";

import { toolSchemaValidation } from "../../Validations/ToolValidations";

const UpdateTool = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const tool = location.state?.tool;

    const [toolname, setToolname] = useState(tool?.toolname || "");

    const [description, setDescription] = useState(tool?.description || "");

    const [condition, setCondition] = useState(tool?.condition || "");

    const [category, setCategory] = useState(tool?.category || "");

    const [availability, setAvailability] = useState(tool?.availability || "");

    const [price, setPrice] = useState(tool?.price || "");

    const [image, setImage] = useState("");

    const [errors, setErrors] = useState({});

    const handleUpdateTool = async (event) => {

        event.preventDefault();

        const toolData = {

            toolid: tool.toolid,

            toolname,

            description,

            condition,

            category,

            availability,

            price,

            image,

        };

        try {

            await toolSchemaValidation.validate(toolData, {

                abortEarly: false,

            });

            setErrors({});

            console.log("Updated Tool Data:", toolData);

            await dispatch(updateTool(toolData)).unwrap();

            alert("Tool Updated Successfully.");

            navigate("/toolsadmin");

        } catch (error) {

            if (error.inner) {

                const validationErrors = {};

                error.inner.forEach((err) => {

                    validationErrors[err.path] = err.message;

                });

                setErrors(validationErrors);

            } else {

                console.log(error);

                alert("Failed to update tool.");

            }

        }

    };

    return (
        <Container fluid className="add-tool-page">
            <Row className="add-tool-row">
                <Col md={8}>
                    <div className="add-tool-card">
                        <h1 className="add-tool-title">Update Tool</h1>
                        <p className="add-tool-subtitle">

                            Edit the selected tool information.
                        </p>
                        <Form onSubmit={handleUpdateTool}>
                            <FormGroup>
                                <Label>Tool ID</Label>
                                <Input

                                    type="text"

                                    value={tool?.toolid || ""}

                                    disabled

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tool Name</Label>
                                <Input

                                    type="text"

                                    placeholder="Enter tool name..."

                                    value={toolname}

                                    onChange={(e) => setToolname(e.target.value)}

                                />
                                <p className="error">{errors.toolname}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input

                                    type="textarea"

                                    placeholder="Enter tool description..."

                                    value={description}

                                    onChange={(e) => setDescription(e.target.value)}

                                />
                                <p className="error">{errors.description}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Condition</Label>
                                <Input

                                    type="select"

                                    value={condition}

                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option value="">Select condition...</option>
                                    <option value="New">New</option>
                                    <option value="Good">Good</option>
                                    <option value="Used">Used</option>
                                    <option value="Needs Maintenance">

                                        Needs Maintenance
                                    </option>
                                </Input>
                                <p className="error">{errors.condition}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input

                                    type="select"

                                    value={category}

                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select category...</option>
                                    <option value="Mobility Aids">Mobility Aids</option>
                                    <option value="Hearing Assistance">Hearing Assistance</option>
                                    <option value="Vision Assistance">Vision Assistance</option>
                                    <option value="Physical Assistance">Physical Assistance</option>
                                    <option value="Safety Tools">Safety Tools</option>
                                    <option value="Health Monitoring Devices">Health Monitoring Devices</option>
                                    <option value="Fitness and Well-being Tools">Fitness and Well-being Tools</option>
                                </Input>
                                <p className="error">{errors.category}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Availability</Label>
                                <Input

                                    type="select"

                                    value={availability}

                                    onChange={(e) => setAvailability(e.target.value)}
                                >
                                    <option value="">Select availability...</option>
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                </Input>
                                <p className="error">{errors.availability}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input

                                    type="number"

                                    placeholder="Enter price..."

                                    value={price}

                                    onChange={(e) => setPrice(e.target.value)}

                                />
                                <p className="error">{errors.price}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tool Image</Label>
                                <Input

                                    type="file"

                                    name="image"

                                    onChange={(e) => setImage(e.target.files[0])}

                                />
                            </FormGroup>
                            <Button type="submit" className="add-tool-btn">

                                Update Tool
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>

    );

};

export default UpdateTool;
