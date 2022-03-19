import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from "../../api";

const EducationAddForm = ({
  portfolioOwnerId,
  setEducationLists,
  setIsAdding,
}) => {
  const [position, setPosition] = useState("재학중");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = portfolioOwnerId;

    await Api.post("education/create", {
      userId,
      school,
      major,
      position,
    });

    const res = await Api.get("educationlist", userId);

    setEducationLists(res.data);

    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="학교이름"
          autoComplete="off"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
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
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      {/*   </fieldset> */}
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

export default EducationAddForm;
