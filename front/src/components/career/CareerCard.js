import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import car from "../style/mvpCardBody.module.scss";

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
    <div className={car.mvpBox}>
      <span>{career.company}</span>
      <br />
      <span>{career.fromDate}</span>
      <br />
      <span>{career.toDate}</span>
      <div className={car.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={car.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              edit
            </button>
            <button className={car.mvpBtn} onClick={handleDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CareerCard;
