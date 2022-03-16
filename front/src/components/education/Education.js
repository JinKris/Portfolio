import React, { useState } from "react";

import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import * as Api from "../../api";

const Education = ({ education, setEducationList, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          setEducationList={setEducationList}
        />
      ) : (
        <EducationCard
          setIsEditing={setIsEditing}
          setEducationList={setEducationList}
        />
      )}
    </>
  );
};

export default Education;
