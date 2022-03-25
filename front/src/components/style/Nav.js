import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Tab from "./Tab.js";
import Logout from "./Logout.js";

const Container = styled.div`
  width: 100vw;
  height: 286px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopLine = styled.div`
  width: 1920px;
  height: 3px;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
`;

const Title = styled.h1`
  width: 100wh;
  height: 65px;
  font-style: bold;
  font-weight: 400;
  font-size: 81.6636px;
  line-height: 111px;
  color: #000000;
  margin-top: 42px;
`;

Nav.defaultProps = {
  title: "Portfolio",
};

export default function Nav({ title }) {
  const [currTab, setCurrTab] = useState("My");
  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  return (
    <Container>
      <TopLine />
      <Logout />
      <Title>{title}</Title>
      <Tab currTab={currTab} onClick={handleClickTab} />
    </Container>
  );
}
