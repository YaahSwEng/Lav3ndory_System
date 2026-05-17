import { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  saveComment,
} from "../../Features/CommentSlice";

import "../data/comments.css";

const ShareComments = () => {

  // Store comment text
  const [commentMsg, setCommentMsg] = useState("");

  // Redux dispatch
  const dispatch = useDispatch();

  // Get comments from Redux store
  const comments = useSelector((state) => state.comments.comments);

  // Get logged-in user
  const user = useSelector((state) => state.users.user);

  // Get logged-in user email
  const email = user.email;

  // Save comment function
  const handleComment = () => {

    // Prevent empty comments
    if (!commentMsg) {
      alert("Please write a comment");
      return;
    }

    const commentData = {
      email: email,
      commentMsg: commentMsg,
    };

    // Send comment to backend
    dispatch(saveComment(commentData));

    // Clear textarea
    setCommentMsg("");
  };



  return (
    <Container className="share-comments-container">

      <Row className="justify-content-center">

        <Col md={8}>

          <Input
            id="comment"
            name="comment"
            placeholder="Tell us what you think about Lavendory..."
            type="textarea"
            className="share-input"
            value={commentMsg}
            onChange={(e) => setCommentMsg(e.target.value)}
          />

          <Button
            className="mt-3"
            onClick={handleComment}
          >
            Share Comment
          </Button>

        </Col>

      </Row>

     

    </Container>
  );
};

export default ShareComments;