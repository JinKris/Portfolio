import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";

function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  //
  const [isDelete, setIsDelete] = useState(false);

  //Office Hour
  const user_id = project.user_id;
  useEffect(() => {
    Api.get("projectlist", user_id).then((res) => setProjects(res.data));
  }, [isDelete]);

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
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
      )}
    </>
  );
}

export default Project;
