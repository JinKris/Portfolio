import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding }) => {
  const [position, setPosition] = useState("재학중");
  const [univ, setUniv] = useState("");
  const [major, setMajor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*     const user_Id = portfolioOwnerId;

    await Api.post("education/create", {
      user_Id,
      univ,
      major,
      position,
    });

    const res = await Api.get("educationlist", portfolioOwnerId);
    setEducations(res.data); */

    setIsAdding(false);
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

      {/*   </fieldset> */}
      <Form.Group as={Row} className="mt-2 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            className="me-3"
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AwardAddForm;
