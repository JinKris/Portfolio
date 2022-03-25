// import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";

function BoardCard({ board, isEditable, setIsEditing, handleDelete }) {
  const { title = "", context = "" } = board;

  return (
    <div>
      <div className="align-items-center">
        <div>
          <span className="primary">title: {title}</span>
          <br />
          <span>{context}</span>
          <br />
        </div>
        {isEditable && (
          <div xs lg="2">
            <button onClick={() => setIsEditing((prev) => !prev)} name="편집">
              편집
            </button>
            <button onClick={handleDelete} name="삭제">
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardCard;
