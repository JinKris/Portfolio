import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardEditForm = ({ currentAward, setAwardlists, setIsEditing }) => {
  const [title, setTitle] = useState(currentAward.description);

  const [description, setDescription] = useState(currentAward.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = currentAward.user_id;
    await Api.put(`awards/${currentAward.id}`, {
      user_id,
      title,
      description,
    });
    const res = await Api.get("awardlist", user_id);
    setAwardlists(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="수상내역"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            className="me-3"
            onClick={() => setIsEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AwardEditForm;
