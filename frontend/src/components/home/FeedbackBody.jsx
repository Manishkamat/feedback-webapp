import React from "react";
import FeedbackCard from "./FeedbackCard";
import { FeedbackCardContainer } from "../../styles/home/FeedbackCard";
const FeedbackBody = ({ feedbacks }) => {

  return (
    <FeedbackCardContainer>
      {feedbacks.map(
        (feedback) =>
            <FeedbackCard key={feedback._id} feedback={feedback} />
      )}
    </FeedbackCardContainer>
  );
};

export default FeedbackBody;
