import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
}) {
  const { title = "", description = "", whenDate = "" } = certificate;
  const handleDelete = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      await Api.delete("certificates", certificate.id);
    }
    // currentCertificate의 userId를 userId 변수에 할당함.
    const userId = certificate.userId;
    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", userId);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{title}</span>
          <br />
          <span className="text-muted">{description}</span>
          <br />
          <span className="text-muted">{whenDate}</span>
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

export default CertificateCard;
