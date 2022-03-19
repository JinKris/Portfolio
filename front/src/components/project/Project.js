import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";

function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          setProjects={setProjects}
          currentProject={project}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
        />
      )}
    </>
  );
}

export default Project;
