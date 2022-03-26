import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const CareerForm = ({
  portfolioOwnerId,
  currentCareer,
  setCareers,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    company: currentCareer?.company ? currentCareer.company : "",
    fromDate: currentCareer?.fromDate ? currentCareer.fromDate : "",
    toDate: currentCareer?.toDate ? currentCareer.toDate : "",
  });

  const handleCareerValue = (name, value) => {
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
        await Api.post("career/create", {
          userId,
          company: form.company,
          fromDate: form.fromDate,
          toDate: form.toDate,
        }).then(setIsAdding(false));
        await Api.get("careerlist", userId).then((res) => setCareers(res.data));
      } else if (setIsEditing) {
        await Api.put(`careers/${currentCareer.id}`, {
          userId: currentCareer.userId,
          company: form.company,
          fromDate: form.fromDate,
          toDate: form.toDate,
        }).then(setIsEditing(false));
        await Api.get("careerlist", currentCareer.userId).then((res) =>
          setCareers(res.data)
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
          placeholder="회사 이름"
          value={form.company}
          onChange={(e) => handleCareerValue("company", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="입사날짜"
          value={form.fromDate}
          onChange={(e) => handleCareerValue("fromDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicToDate" className="mt-3">
        <Form.Control
          type="date"
          min={form?.fromDate}
          placeholder="퇴사날짜"
          value={form.toDate}
          onChange={(e) => handleCareerValue("toDate", e.target.value)}
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

export default CareerForm;
