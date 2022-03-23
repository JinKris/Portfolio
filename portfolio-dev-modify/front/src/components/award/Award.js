import React, { useState } from "react";

import AwardCard from "./AwardCard";
import AwardForm from "./AwardForm";

const Award = ({ award, setAwardLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardForm
          setIsEditing={setIsEditing}
          setAwardLists={setAwardLists}
          currentAward={award}
        />
      ) : (
        <AwardCard
          award={award}
          portfolioOwnerId={award.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setAwardLists={setAwardLists}
        />
      )}
    </>
  );
};

export default Award;
