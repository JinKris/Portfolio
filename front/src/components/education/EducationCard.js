import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  setEducationLists,
}) => {
  const handleDelete = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      await Api.delete("educations", education.id);
    }
    const userId = education.userId;
    const res = await Api.get("educationlist", userId);
    setEducationLists(res.data);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${education.position})`}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleDelete}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
};

export default EducationCard;
