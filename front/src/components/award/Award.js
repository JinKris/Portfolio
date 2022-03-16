import React, { useState } from "react";

import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

const Award = ({ award, setAwards, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          /* setAward={setAward} */
        />
      ) : (
        <AwardCard
          setIsEditing={setIsEditing}
          /* setAward={setAward} */
        />
      )}
    </>
  );
};

export default Award;
