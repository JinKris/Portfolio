import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const CertificateForm = ({
  portfolioOwnerId,
  currentCertificate,
  setCertificates,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    whenDate: "",
  });

  const handleCertificateValue = (name, value) => {
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
        await Api.post("certificate/create", {
          userId,
          title: form.title,
          description: form.description,
          whenDate: form.whenDate,
        }).then(setIsAdding(false));
        await Api.get("certificatelist", userId).then((res) =>
          setCertificates(res.data)
        );
      } else if (setIsEditing) {
        await Api.put(`certificates/${currentCertificate.id}`, {
          userId: currentCertificate.userId,
          title: form.title,
          description: form.description,
          whenDate: form.whenDate,
        }).then(setIsEditing(false));
        await Api.get("certificatelist", currentCertificate.userId).then(
          (res) => setCertificates(res.data)
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
          placeholder="자격증"
          value={form.title}
          onChange={(e) => handleCertificateValue("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={form.description}
          onChange={(e) =>
            handleCertificateValue("description", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicWhenDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="취득날짜"
          value={form.whenDate}
          onChange={(e) => handleCertificateValue("whenDate", e.target.value)}
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

export default CertificateForm;
