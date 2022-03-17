import React, { useState,useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api"

function Project({ project, setProjects, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  //useState로 usDelete 상태를 생성함.
  const [isDelete,setIsDelete] = useState(false);

  const user_id = project.user_id;
  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projectlist", user_id).then((res) => setProjects(res.data));
  }, [isDelete]);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : !isDelete && (
        <ProjectCard
          project={project}
          setProjects={setProjects}
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
