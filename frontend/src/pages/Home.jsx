import { motion } from "framer-motion";
import {
  HomeColumnTwo,
  HomeWrapper,
} from "../styles/home/Home.styled";
import TopBar from "../components/home/TopBar";
import FeedbackEmpty from "../components/home/FeedbackEmpty";
import FeedbackBody from "../components/home/FeedbackBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getFeedbacks, reset } from "../features/feedback/feedbackSlice";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const Home = () => {
  const dispatch = useDispatch();

  const {
    feedbacks,
    isLoading,
  } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getFeedbacks());

    return () => {
      dispatch(reset());
    };
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HomeWrapper>
        <HomeColumnTwo>
          <TopBar feedbacks={feedbacks} />
          {feedbacks.length > 0  && (
            <FeedbackBody feedbacks={feedbacks} />
          )}
          {
          feedbacks.length === 0 && 
            (<FeedbackEmpty />)
          }
        </HomeColumnTwo>
      </HomeWrapper>
    </motion.div>
  );
};

export default Home;
