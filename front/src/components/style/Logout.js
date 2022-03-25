import React from "react";
import styled from "styled-components";

/* const Container = styled.button`
  width: 60px;
  height: 25px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  left: 852.38px;
  top: 28px;
`; */

const Text = styled.a`
  width: 60px;
  height: 25px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 852.38px;
  top: 28px;
  text-decoration: none;
  color: black;
`;

Logout.defaultProps = {
  text: "logout",
};

export default function Logout({ text }) {
  return (
    <>
      <Text>{text}</Text>
    </>
  );
}
