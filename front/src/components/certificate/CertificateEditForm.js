import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(
    currentCertificate.description
  );
  //useState로 when_date 상태를 생성함.
  const [whenDate, setWhenDate] = useState(currentCertificate.when_date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // "certificates/수상 id" 엔드포인트로 PUT 요청함...
    await Api.put(`certificates/${currentCertificate.id}`, {
      /*userId,*/
      title,
      description,
      whenDate,
    });
    // currentCertificate의 userId를 userId 변수에 할당함.
    const userId = currentCertificate.userId;
    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", userId);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <Form.Control
          type="text"
          placeholder="시작날짜"
          value={whenDate}
          onChange={(e) => setWhenDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
