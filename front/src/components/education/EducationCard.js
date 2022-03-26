import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

import edu from "../style/mvpCardBody.module.scss";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  handleDelete,
}) => {
  const { school = "", major = "", position = "" } = education;

  return (
    <div className={edu.mvpBox}>
      <span>{school}</span>
      <br />
      <span>{`${major} (${position})`}</span>
      <div className={edu.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={edu.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              edit
            </button>
            <button className={edu.mvpBtn} onClick={handleDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
