import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FormWrapper,
  FormBtn,
  FormInput,
  FormLabel,
  FormTitle,
  FormLink,
  FormLinkBold,
} from "../styles/auth/Auth.styled";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FormErrorMessage } from "../styles/createFeedback/createFeedback.styled";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const { username, password } = formData;
  // const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // navigate to login
    if (user) {
      navigate("/");
    }

    if (isError) {
      toast.error(`${message}`);
    }

    if (!user) {
      dispatch(reset());
    }
  }, [navigate, user, isError, message]);

  //   submit form to database
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return setError(true);
    }

    dispatch(login(formData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <FormWrapper onSubmit={handleSubmit}>
        <FormTitle>Login</FormTitle>
        <FormInput
          id="username"
          type="text"
          value={username}
          $title={username}
          $error={error}
          name="username"
          onChange={onChange}
          placeholder="Username"
        />
        {username === "" && error && (
          <FormErrorMessage className="text-start" $firstlabel={true}>
            Can't be empty
          </FormErrorMessage>
        )}

        <FormInput
          id="password"
          name="password"
          value={password}
          $title={password}
          $error={error}
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
        {password === "" && error && (
          <FormErrorMessage className="text-start" $firstlabel={true}>
            Can't be empty
          </FormErrorMessage>
        )}
        <FormBtn type="submit">Log in</FormBtn>
        <FormLink>
          Don't have an account?{" "}
          <FormLinkBold to="/register">Sign Up</FormLinkBold>
        </FormLink>
      </FormWrapper>
    </motion.div>
  );
};

export default Login;
