import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import MvpButton from "../../MvpButton";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  handleDelete,
}) => {
  const { school = "", major = "", position = "" } = education;

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{school}</span>
          <br />
          <span className="text-muted">{`${major} (${position})`}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <MvpButton
              onClick={() => setIsEditing((prev) => !prev)}
              name="편집"
            />
            <MvpButton onClick={handleDelete} name="삭제" />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
};

export default EducationCard;
