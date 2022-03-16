import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

const AwardCard = ({ award, isEditable, setIsEditing }) => {
  return (
    <Card.Text>
      {/* <span>{education.school}</span> */}
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
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                삭제
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Card.Text>
  );
};

export default AwardCard;
