import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardForm = ({
  portfolioOwnerId,
  currentAward,
  setAwardLists,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleAwardValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (setIsAdding) {
        const userId = portfolioOwnerId;
        await Api.post("award/create", {
          userId,
          title: form.title,
          description: form.description,
        }).then(setIsAdding(false));
        await Api.get("awardlist", userId).then((res) =>
          setAwardLists(res.data)
        );
      } else if (setIsEditing) {
        await Api.put(`awards/${currentAward.id}`, {
          userId: currentAward.userId,
          title: form.title,
          description: form.description,
        }).then(setIsEditing(false));
        await Api.get("awardlist", currentAward.userId).then((res) =>
          setAwardLists(res.data)
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="수상내역"
          autoComplete="off"
          value={form.title}
          onChange={(e) => handleAwardValue("title", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={form.description}
          onChange={(e) => handleAwardValue("description", e.target.value)}
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

export default AwardForm;
