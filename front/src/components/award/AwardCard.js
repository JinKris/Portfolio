import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardCard = ({ award, isEditable, setIsEditing }) => {
  return (
    <Card.Text>
      <span>{award.title}</span>
      <br />
      <span className="text-muted">{award.description}</span>
      {isEditable && (
        <Col>
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                편집
              </Button>
            </Col>
            {/*             <Col sm={{ span: 20 }}>
              <Button variant="outline-info" size="sm">
                삭제
              </Button>
            </Col> */}
          </Row>
        </Col>
      )}
    </Card.Text>
  );
};

export default AwardCard;
