import styled, { css } from "styled-components";

Tab.defaultProps = {
  currTab: "My",
  onClick: () => {},
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid black;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  top: 50px;
`;

const EachTab = styled.p`
  font-size: 19px;
  line-height: 22px;
  color: black;
  padding: 8px;

  + p {
    margin-left: 17px;
  }

  ${(props) =>
    props.active &&
    css`
      color: black;
      font-weight: bold;
      background: rgba(230, 230, 230, 0.0001);
      box-shadow: inset 0px -4px 0px black;
    `}
`;

const tabs = ["My", "Net"];

export default function Tab({ currTab, onClick }) {
  return (
    <TabContainer>
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
    </TabContainer>
  );
}
