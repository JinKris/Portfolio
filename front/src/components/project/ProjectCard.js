import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";

function ProjectCard({ project, isEditable, setIsEditing, handleDelete }) {
  const { title = "", description = "", fromDate = "", toDate = "" } = project;

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
            <MvpButton
              onClick={() => setIsEditing((prev) => !prev)}
              name="편집"
            />
            <MvpButton onClick={handleDelete} name="삭제" />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
