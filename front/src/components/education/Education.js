import React, { useState } from "react";

import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ education, setEducationLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
          currentEducation={education}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducationLists={setEducationLists}
        />
      )}
    </>
  );
};

export default Education;
