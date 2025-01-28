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
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FormErrorMessage } from "../styles/createFeedback/createFeedback.styled";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [error, setError] = useState(false);

  const {  username, email, password, passwordConfirm } = formData;
  // const { name, username, email, password, passwordConfirm } = formData;

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

    if (email === "" || password === "") {
      return setError(true);
    }

    if (passwordConfirm != password) {
      return setError(true);
    }

    dispatch(register(formData));
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
        <FormTitle>Register</FormTitle>
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
          id="email"
          type="text"
          value={email}
          $title={email}
          $error={error}
          name="email"
          onChange={onChange}
          placeholder="Email"
        />
        {email === "" && error && (
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
          onChange={onChange}
          placeholder="Password"
        />
        {password === "" && error && (
          <FormErrorMessage className="text-start" $firstlabel={true}>
            Can't be empty
          </FormErrorMessage>
        )}
        <FormInput
          id="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          $title={passwordConfirm}
          $error={error}
          type="password"
          onChange={onChange}
          placeholder="Confirm Password"
        />
          {passwordConfirm === "" && error && (
          <FormErrorMessage className="text-start" $firstlabel={true}>
            Can't be empty
          </FormErrorMessage>
        )}
        {password !== passwordConfirm && error && (
          <FormErrorMessage className="text-start" $firstlabel={true}>
            Please correct your password
          </FormErrorMessage>
        )}
        <FormBtn type="submit">Sign Up</FormBtn>
        <FormLink>
          Already have an account?{" "}
          <FormLinkBold to="/login">Login</FormLinkBold>
        </FormLink>
      </FormWrapper>
    </motion.div>
  );
};

export default Login;
