import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";
import pro from "../style/mvpCardBody.module.scss";

function ProjectCard({ project, isEditable, setIsEditing, handleDelete }) {
  const { title = "", description = "", fromDate = "", toDate = "" } = project;

  return (
    <div className={pro.mvpBox}>
      <span>{title}</span>
      <br />
      <span>{description}</span>
      <br />
      <span>{fromDate}</span>
      <br />
      <span>{toDate}</span>
      <br />
      <div className={pro.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={pro.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              edit
            </button>
            <button className={pro.mvpBtn} onClick={handleDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
