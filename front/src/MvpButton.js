import React from "react";
const MvpButton = ({ name, onClick, type }) => {
  return <button type={type} onClick={onClick}>{`${name}`}</button>;
};

export default MvpButton;
