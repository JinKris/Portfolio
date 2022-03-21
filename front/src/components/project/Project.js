import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function Project({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectForm setIsEditing={setIsEditing} currentProject={project} />
      ) : (
        <ProjectCard
          project={project}
          portfolioOwnerId={project.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
