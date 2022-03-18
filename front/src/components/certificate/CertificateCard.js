import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
}) {
  const handleDelete = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      // await Api.delete("Certificate", project.id);
    }

    // certificate의 user_id를 user_id 변수에 할당함.
    const user_id = certificate.user_id;
    const res = await Api.get("certificatelist", user_id);
    let currentCertificates = [...res.data];

    const card = currentCertificates.find((c) => c.id === certificate.id);
    const idx = currentCertificates.indexOf(card);
    currentCertificates.splice(idx, 1);
    setCertificates(currentCertificates);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
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
