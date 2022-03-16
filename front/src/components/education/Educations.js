import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";
import EducationCard from "./EducationCard";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    Api.get("educationList", portfolioOwnerId).then((res) =>
      setEducationList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "80rem" }}>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <EducationCard />
        {educationList.map((education) => (
          <Education
            key={education.id}
            education={education}
            educationList={setEducationList}
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
            setEducationList={setEducationList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Educations;
