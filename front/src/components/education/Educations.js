import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [educationLists, setEducationLists] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducationLists(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "80rem" }}>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educationLists.map((education) => (
          <Education
            key={education.id}
            education={education}
            setEducationLists={setEducationLists}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4 me-2">
            <Col sm={{ span: 40 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducationLists={setEducationLists}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Educations;
