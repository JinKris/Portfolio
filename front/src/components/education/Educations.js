import React, { useState, useEffect } from "react";
import { EducationContext } from "./EducationContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationForm from "./EducationForm";
import MvpButton from "../../MvpButton";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <EducationContext.Provider value={{ educations, setEducations }}>
      <Card style={{ width: "80rem" }}>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {educations.map((education) => (
            <Education
              key={education.id}
              education={education}
              isEditable={isEditable}
            />
          ))}
          {isEditable && (
            <Row className="mt-3 text-center mb-4 me-2">
              <Col sm={{ span: 40 }}>
                <MvpButton onClick={() => setIsAdding(true)} name="+" />
              </Col>
            </Row>
          )}
          {isAdding && (
            <EducationForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </EducationContext.Provider>
  );
};

export default Educations;
