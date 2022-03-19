import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  async function handleDelete(e) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      await Api.delete("projects", project.id);
    }
    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const user_id = project.user_id;
    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", user_id);
    // certificates를 response의 data로 세팅함.
    setProjects(res.data);
  }
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span className="primary">{project.title}</span>
          <br />
          <span>{project.description}</span>
          <br />
          <span className="text-muted">
            {project.fromDate.toString().substr(0, 10)}
          </span>
          <br />
          <span className="text-muted">
            {project.toDate.toString().substr(0, 10)}
          </span>
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
