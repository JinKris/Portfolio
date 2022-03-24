import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import MvpButton from "../../MvpButton";

const AwardCard = ({ award, isEditable, setIsEditing, handleDelete }) => {
  const { title = "", description = "" } = award;

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span className="primary">{title}</span>
          <br />
          <span className="text-muted">{description}</span>
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
};

export default AwardCard;
