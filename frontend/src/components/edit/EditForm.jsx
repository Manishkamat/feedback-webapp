import React, { useState } from "react";
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  BackToHomeBtn,
  BackToHomeIcon,
  ButtonGroup,
  CreateFeedbackWrapper,
  FormErrorMessage,
  FormLabel,
  FormLabelTitle,
  FormTextArea,
  FormTitle,
  FormWrapper,
} from "../../styles/createFeedback/createFeedback.styled";
import { FormInput } from "../../styles/auth/Auth.styled";
import { FeedbackBtn } from "../../styles/shared/Shared.styled";
import {
  deleteFeedback,
  editFeedback,
  } from "../../features/feedback/feedbackSlice";

const EditForm = ({ feedback }) => {
  const [formData, setFormData] = useState({
    title: feedback.title,
    description: feedback.description,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description } = formData;

  const [error, setError] = useState(false);

  //  set values in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // edit feedback
  const handleClick = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return setError(true);
    }

    dispatch(
      editFeedback({ feedbackId: feedback._id, feedbackData: formData })
    );
    navigate("/");
  };

  // delete feedback
  const deleteSingleFeedback = (e, id) => {
    e.preventDefault();

    dispatch(deleteFeedback(id));

    navigate("/");
    return;
  };

  // capitalise based on status
  function capitalizeBasedOnStatus(value) {
    switch (value) {
      case "in-progress":
        // Capitalize the first and fourth characters
        return (
          value.charAt(0).toUpperCase() +
          value.charAt(1) +
          value.charAt(2) +
          value.charAt(3).toUpperCase() +
          value.slice(4)
        );
      case "ui":
      case "ux":
        // Capitalize the entire value for "ui" or "ux"
        return value.toUpperCase();
      default:
        // Capitalize only the first character for other cases
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  return (
    <CreateFeedbackWrapper>
      <Link to="/">
        <BackToHomeBtn>
          <BackToHomeIcon src={arrowLeft} />
          Go Back
        </BackToHomeBtn>
      </Link>
      <FormWrapper>
        <FormTitle>Editing</FormTitle>
        <FormLabelTitle>Feedback Title</FormLabelTitle>
        <FormLabel>Add a short, descriptive headline</FormLabel>
        <FormInput
          type="text"
          value={title}
          $title={title}
          $error={error}
          name="title"
          onChange={(e) => handleChange(e)}
        />
        {title === "" && error ? (
          <FormErrorMessage $firstlabel={true}>Can't be empty</FormErrorMessage>
        ) : null}

        <FormLabelTitle>Feedback Detail</FormLabelTitle>
        <FormLabel>
          Include any specific comments on what should be improved, added, etc.
        </FormLabel>
        <FormTextArea
          $error={error}
          value={description}
          $description={description}
          name="description"
          onChange={(e) => handleChange(e)}
        />
        {description === "" && error ? (
          <FormErrorMessage>Can't be empty</FormErrorMessage>
        ) : null}

        <ButtonGroup>
          {/* <FeedbackBtn
            onClick={(e) => deleteSingleFeedback(e, feedback._id)}
            className="btn-delete"
          >
            Delete
          </FeedbackBtn> */}
          <div>
            <FeedbackBtn onClick={() => navigate("/")} className="btn-cancel">
              Cancel
            </FeedbackBtn>
            <FeedbackBtn onClick={(e) => handleClick(e)}>
              Save Changes
            </FeedbackBtn>
          </div>
        </ButtonGroup>
      </FormWrapper>
    </CreateFeedbackWrapper>
  );
};

export default EditForm;
