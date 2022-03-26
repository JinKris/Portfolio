import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import MvpButton from "../../MvpButton";

import education from "../style/mvpCardBody.module.scss";
const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  handleDelete,
}) => {
  const { school = "", major = "", position = "" } = education;

  return (
    <div className={education.mvpContainer}>
      <div>
        <span>1:{school}</span>
        <br />
        <span className="text-muted">{`${major} (${position})`}</span>
        {isEditable && (
          <>
            <button onClick={() => setIsEditing((prev) => !prev)}>편집</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
