import React, { useState } from "react";

import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

const Award = ({ award, setAwardLists, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          setAwardLists={setAwardLists}
          currentAward={award}
        />
      ) : (
        !deleted && (
          <AwardCard
            award={award}
            isEditable={isEditable}
            setIsEditing={setIsEditing}
            setDeleted={setDeleted}
          />
        )
      )}
    </>
  );
};

export default Award;
