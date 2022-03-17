import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardCard = ({ award, isEditable, setIsEditing, setDeleted }) => {
  async function del(e) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      await Api.delete("awards", award.id);
      setDeleted(true);
    }
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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

export default AwardCard;
