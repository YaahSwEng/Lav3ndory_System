import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getComments } from "../Features/CommentSlice";

const CommentList = () => {

    // Redux dispatch
    const dispatch = useDispatch();

    // Get comments from Redux store
    const comments = useSelector(
        (state) => state.comments.comments
    );

    // Get comments when component loads
    useEffect(() => {

        dispatch(getComments());

    }, [dispatch]);

    return (

        <div className="comments-list-section">

            <h2 className="section-title">
                What Our Users Say
            </h2>

            <p className="section-text">
                Real experiences shared by our Lavendory community.
            </p>

            {comments.map((comment) => (

                <div
                    className="comment-card"
                    key={comment._id}
                >

                    {/* User email */}

                    <h5 className="comment-user">
                        {comment.email}
                    </h5>

                    {/* Comment message */}

                    <p className="comment-message">
                        {comment.commentMsg}
                    </p>

                    {/* Comment date */}

                    <small className="comment-date">

                        {new Date(comment.commentDate).toLocaleString()}

                    </small>

                </div>

            ))}

        </div>
    );
};

export default CommentList;