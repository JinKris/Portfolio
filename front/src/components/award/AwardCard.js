import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import MvpButton from "../../MvpButton";

const AwardCard = ({ award, isEditable, setIsEditing, handleDelete }) => {
  const { title = "", description = "" } = award;

  return (
    <div>
      <div>
        <span className="primary">{title}</span>
        <br />
        <span className="text-muted">{description}</span>
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
};

export default AwardCard;
