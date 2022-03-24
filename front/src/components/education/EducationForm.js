import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationForm = ({
  portfolioOwnerId,
  currentEducation,
  setEducationLists,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({ school: "", major: "", position: "" });

  const handleEducationValue = (name, value) => {
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
        await Api.post("education/create", {
          userId,
          school: form.school,
          major: form.major,
          position: form.position,
        }).then(setIsAdding(false));
        await Api.get("educationlist", userId).then((res) =>
          setEducationLists(res.data)
        );
      } else if (setIsEditing) {
        await Api.put(`educations/${currentEducation.id}`, {
          userId: currentEducation.userId,
          school: form.school,
          major: form.major,
          position: form.position,
        }).then(setIsEditing(false));
        await Api.get("educationlist", currentEducation.userId).then((res) =>
          setEducationLists(res.data)
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
          placeholder="학교이름"
          autoComplete="off"
          value={form.school}
          onChange={(e) => handleEducationValue("school", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="전공"
          value={form.major}
          onChange={(e) => handleEducationValue("major", e.target.value)}
        />
      </Form.Group>
      {/* <fieldset> */}
      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
          id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={form.position === "재학중"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={form.position === "학사졸업"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={form.position === "석사졸업"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={form.position === "박사졸업"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
      </div>

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

export default EducationForm;
