import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardEditForm = ({ setIsEditing }) => {
  const [position, setPosition] = useState("재학중");
  const [univ, setUniv] = useState("");
  const [major, setMajor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `상태: ${position} 졸업학교: ${univ} 전공: ${major}`;
    alert(message);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="수상내역"
          autoComplete="off"
          value={univ}
          onChange={(e) => setUniv(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            onClick={handleSubmit()}
          >
            확인
          </Button>
          <Button
            variant="secondary"
            type="submit"
            className="me-3"
            onClick={setIsEditing(true)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AwardEditForm;
