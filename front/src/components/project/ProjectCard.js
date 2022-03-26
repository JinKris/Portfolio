import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";

function ProjectCard({ project, isEditable, setIsEditing, handleDelete }) {
  const { title = "", description = "", fromDate = "", toDate = "" } = project;

  return (
    <div>
      <div>
        <span className="primary">{title}</span>
        <br />
        <span>{description}</span>
        <br />
        <span className="text-muted">{fromDate}</span>
        <br />
        <span className="text-muted">{toDate}</span>
        <br />
        {isEditable && (
          <>
            <MvpButton
              onClick={() => setIsEditing((prev) => !prev)}
              name="편집"
            />
            <MvpButton onClick={handleDelete} name="삭제" />
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
