import React, { useState } from "react";
import {
  TopBarContainer,
  TopBarLeft,
} from "../../styles/home/TopBar.styled";
import AddFeedbackBtn from "../shared/AddFeedbackBtn";
import Logout from "../shared/Logout";
const TopBar = ({ feedbacks }) => {

  return (
    <TopBarContainer>
      <TopBarLeft>
        <div style={{ fontWeight: "bold", fontSize: "40px"}}>Admin Feedback Dashboard</div>
      </TopBarLeft>
      <AddFeedbackBtn />
      <Logout />
    </TopBarContainer>
  );
};

export default TopBar;
