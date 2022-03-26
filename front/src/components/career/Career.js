import React, { useState } from "react";
import CareerCard from "./CareerCard";
import CareerForm from "./CareerForm";

const Career = ({ career, setCareers, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CareerForm
          setIsEditing={setIsEditing}
          setCareers={setCareers}
          currentCareer={career}
        />
      ) : (
        <CareerCard
          career={career}
          portfolioOwnerId={career.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCareers={setCareers}
        />
      )}
    </>
  );
};

export default Career;
