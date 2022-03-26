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
      <div>
        <p>학력</p>
        {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <div>
            <MvpButton onClick={() => setIsAdding(true)} name="+" />
          </div>
        )}
        {isAdding && (
          <EducationForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </EducationContext.Provider>
  );
};

export default Educations;
