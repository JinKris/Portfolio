import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";

const Education = ({ education, setEducationLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationForm
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
          currentEducation={education}
        />
      ) : (
        <EducationCard
          education={education}
          portfolioOwnerId={education.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
        />
      )}
    </>
  );
};

export default Education;
