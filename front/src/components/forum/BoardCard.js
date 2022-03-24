import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";

function BoardCard({ board, isEditable, setIsEditing, handleDelete }) {
  const { title = "", context = "" } = board;

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span className="primary">title: {title}</span>
          <br />
          <span>context: {context}</span>
          <br />
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button onClick={() => setIsEditing((prev) => !prev)} name="편집">
              편집
            </Button>
            <Button onClick={handleDelete} name="삭제">
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default BoardCard;
