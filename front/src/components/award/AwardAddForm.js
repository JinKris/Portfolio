import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from "../../api";

const AwardAddForm = ({ portfolioOwnerId, setAwardLists, setIsAdding }) => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  /* const [form, setForm] = useState({ title: "", description: "" }); */

  /*   const handleAwardValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = portfolioOwnerId;

    try {
      await Api.post("award/create", {
        userId,
        title,
        description,
      });
      const res = await Api.get("awardlist", userId);
      setAwardLists(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsAdding(false);
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
