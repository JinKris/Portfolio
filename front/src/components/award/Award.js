import React, { useState } from "react";

import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

const Award = ({ award, setAwardLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          setAwardLists={setAwardLists}
          currentAward={award}
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
