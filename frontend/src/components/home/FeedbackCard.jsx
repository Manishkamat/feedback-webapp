import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FeedbackCardContent,
  FeedbackCardLeft,
  FeedbackCardWrapper,
  FeedbackMobileWrapper,
} from "../../styles/home/FeedbackCard";
import {
  FeedbackBtn,
  Title,
} from "../../styles/shared/Shared.styled";
import { deleteFeedback } from "../../features/feedback/feedbackSlice";
import { Link } from "react-router-dom";;
const FeedbackCard = ({ feedback }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // delete feedback
  const deleteSingleFeedback = (e, id) => {
    e.preventDefault();

    dispatch(deleteFeedback(id));

    window.location.reload(false);
    navigate("/");
    return;
  };

  const date = new Date(feedback.updatedAt);

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate()
    .toString()
    .padStart(2, "0")} ${date.getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds()
    .toString()
    .padStart(2, "0")}`;
// const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; 

  return (
    <FeedbackCardWrapper>
      <FeedbackCardLeft>
        {/* <UpvoteBtn feedback={feedback} /> */}
        <FeedbackCardContent>
          <Link to={`/feedback/details/${feedback._id}`}>
            <Title>{feedback.title.length > 50 ? feedback.title.slice(0, 50) + "..." : feedback.title}</Title>
            <p className="text">{feedback.description.slice(0, 100)}...</p>
            <p>{formattedDate}</p>
          </Link>
          {/* <Tag>{feedback.category}</Tag> */}
        </FeedbackCardContent>
      </FeedbackCardLeft>

      <FeedbackMobileWrapper>
        <FeedbackBtn
          className="details-header-btn"
          onClick={() => navigate(`/feedback/edit/${feedback._id}`)}
        >
          Edit Feedback
        </FeedbackBtn>
        <div style={{ marginBottom: "10px"}}> </div>
        <FeedbackBtn
          onClick={(e) => deleteSingleFeedback(e, feedback._id)}
          className="btn-delete"
        >
          Delete
        </FeedbackBtn>
      </FeedbackMobileWrapper>
    </FeedbackCardWrapper>
  );
};

export default FeedbackCard;
