import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { EducationContext } from "./EducationContext";
import edu from "../style/mvpCardBody.module.scss";

const EducationForm = ({
  portfolioOwnerId,
  currentEducation,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    school: currentEducation?.school ? currentEducation.school : "",
    major: currentEducation?.major ? currentEducation.major : "",
    position: currentEducation?.position ? currentEducation.position : "",
  });
  const { educations, setEducations } = useContext(EducationContext);

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
        })
          .then(setIsAdding(false))
          .then(
            setEducations([
              ...educations,
              {
                userId,
                school: form.school,
                major: form.major,
                position: form.position,
              },
            ])
          );
      } else if (setIsEditing) {
        await Api.put(`educations/${currentEducation.id}`, {
          userId: currentEducation.userId,
          school: form.school,
          major: form.major,
          position: form.position,
        }).then(setIsEditing(false));
        await Api.get("educationlist", currentEducation.userId).then((res) =>
          setEducations(res.data)
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
      <div className="mb-3 mt-3">
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className={edu.mvpBtn} type="submit">
            submit
          </button>
          <button
            className={edu.mvpBtn}
            onClick={(e) => {
              setIsAdding ? setIsAdding(false) : setIsEditing(false);
            }}
          >
            cheso
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EducationForm;
