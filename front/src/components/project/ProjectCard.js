import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api"

function ProjectCard({ project, isEditable, setIsEditing,isDelete,setIsDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // "project/수상 id" 엔드포인트로 Delete 요청함.
    await Api.delete('projects', project.id);
    setIsDelete(true)
  };
  return (
    <Card.Body>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
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
          </Col>
        )}
        {!isDelete && (
          <Col xs lg="1">
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
    </Card.Body>
  );
}

export default ProjectCard;
