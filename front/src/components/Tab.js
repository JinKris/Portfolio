import React from "react";
import styled, { css } from "styled-components";

Tab.defaultProps = {
  currTab: "트랙",
  onClick: () => {},
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 100%;
`;

const EachTab = styled.p`
  font-size: 19px;
  line-height: 22px;
  color: #524fa1;
  padding: 8px;

  + p {
    margin-left: 17px;
  }

  ${(props) =>
    props.active &&
    css`
      color: red;
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      box-shadow: inset 0px -4px 0px #524fa1;
    `}
`;

const tabs = ["트랙", "과목"];

export default function Tab({ currTab, onClick }) {
  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <EachTab
            key={`&{tab}-${i}`}
            active={currTab === tab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </EachTab>
        );
      })}
    </Container>
  );
}
