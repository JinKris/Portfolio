import { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import { ProjectContext } from "./ProjectContext";

function ProjectCard({ project, isEditable, setIsEditing, handleDelete }) {
  const { title = "", description = "", fromDate = "", toDate = "" } = project;
  const { projects, setProjects } = useContext(ProjectContext);

  // async function handleDelete(e) {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     // e.preventDefault();
  //     // e.stopPropagation();
  //     try {
  //       await Api.delete("projects", project.id);
  //       // 1
  //       setProjects(projects.filter((card) => card.id !== project.id));
  //       // 2
  //       // const idx = projects.findIndex((item) => item.id === project.id);
  //       // projects.splice(idx, 1);
  //       // setProjects([...projects]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span className="primary">{title}</span>
          <br />
          <span>{description}</span>
          <br />
          <span className="text-muted">{fromDate}</span>
          <br />
          <span className="text-muted">{toDate}</span>
          <br />
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleDelete}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
