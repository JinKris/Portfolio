import React, { useState } from "react";

import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

const Award = ({ award, setAwardLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwardLists={setAwardLists}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default Award;
