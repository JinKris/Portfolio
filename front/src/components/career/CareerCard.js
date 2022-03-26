import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CareerCard({ career, isEditable, setIsEditing, setCareers }) {
  const handleDelete = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      e.stopPropagation();
      await Api.delete("careers", career.id);
      const userId = career.userId;
      const res = await Api.get("careerlist", userId);

      setCareers(res.data);
    } else return;
  };

  const { company = "", fromDate = "", toDate = " " } = career;

  return (
    <div>
      <div>
        {career.company}
        <br />
        <span className="text-muted">입사날짜: {career.fromDate}</span>
        <br />
        <span className="text-muted">퇴사날짜: {career.toDate}</span>
        {isEditable && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default CareerCard;
