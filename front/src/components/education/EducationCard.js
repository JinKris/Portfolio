import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationCard = ({
  education,
  isEditable,
  setIsEditing,
  setEducationLists,
}) => {
  async function del(e) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await Api.delete("educations", education.id);
    }
    const user_id = education.user_id;
    const res = await Api.get("educationlist", user_id);
    setEducationLists(res.data);
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${
            education.position || ""
          })`}</span>
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
              onClick={del}
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
