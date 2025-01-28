import  { useState } from "react";
import arrowLeft from "../assets/shared/icon-arrow-left.svg";
import {
  BackToHomeBtn,
  BackToHomeIcon,
  FormLabelTitle,
  FormLabel,
  FormTextArea,
} from "../styles/createFeedback/createFeedback.styled";
import { FeedbackBtn } from "../styles/shared/Shared.styled";
import { motion } from "framer-motion";
import {
  CreateFeedbackWrapper,
  FormWrapper,
  FormTitle,
  ButtonGroup,
  FormErrorMessage,
} from "../styles/createFeedback/createFeedback.styled";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../styles/auth/Auth.styled";
import { createFeedback } from "../features/feedback/feedbackSlice";
import { useDispatch } from "react-redux";
const CreateFeedback = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Feature",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const { title, description } = formData;

  //  set values in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add feedback
  const handleClick = (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      return setError(true);
    }

    dispatch(createFeedback(formData));
    navigate("/");
    return;
  };

  // return to homepage
  const returnToHome = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CreateFeedbackWrapper>
        <Link to="/">
          <BackToHomeBtn>
            <BackToHomeIcon src={arrowLeft} />
            Go Back
          </BackToHomeBtn>
        </Link>
        <FormWrapper>
          <FormTitle>Create New Feedback</FormTitle>
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
          {title === "" && error && (
            <FormErrorMessage $firstlabel={true}>
              Can't be empty
            </FormErrorMessage>
          )}

          <FormLabelTitle>Feedback Detail</FormLabelTitle>
          <FormLabel>
            Include any specific comments on what should be improved, added,
            etc.
          </FormLabel>
          <FormTextArea
            $error={error}
            value={description}
            $description={description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {description === "" && error && (
            <FormErrorMessage>Can't be empty</FormErrorMessage>
          )}

          <ButtonGroup>
            <FeedbackBtn
              onClick={(e) => returnToHome(e)}
              className="btn-cancel"
            >
              Cancel
            </FeedbackBtn>
            <FeedbackBtn onClick={(e) => handleClick(e)}>
              Add Feedback
            </FeedbackBtn>
          </ButtonGroup>
        </FormWrapper>
      </CreateFeedbackWrapper>
    </motion.div>
  );
};

export default CreateFeedback;
