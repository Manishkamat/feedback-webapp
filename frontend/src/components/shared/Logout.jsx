import authService from "../../features/auth/authService";
import {
  FeedbackBtn,
} from "../../styles/shared/Shared.styled";
import { useNavigate } from "react-router-dom";



const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authService.logout();
    navigate("/login")
  }
  return (
    <FeedbackBtn onClick={() => handleLogout()}>
      Logout
    </FeedbackBtn>
  );
};

export default Logout;
