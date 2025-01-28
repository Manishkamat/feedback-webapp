import React from "react";
import {
  FeedbackCardContent,
  FeedbackCardLeft,
  FeedbackCardWrapper,
} from "../../styles/home/FeedbackCard";
import {
  Title,
} from "../../styles/shared/Shared.styled";
import { Tag } from "../../styles/home/Tags.styled";
const DetailsCard = ({ feedback }) => {
  return (
    <FeedbackCardWrapper>
      <FeedbackCardLeft>
        <FeedbackCardContent>
          <Title>{feedback.title}</Title>
          <p className="text">{feedback.description}</p>
          <Tag>{feedback.category}</Tag>
        </FeedbackCardContent>
      </FeedbackCardLeft>
    </FeedbackCardWrapper>
  );
};

export default DetailsCard;
