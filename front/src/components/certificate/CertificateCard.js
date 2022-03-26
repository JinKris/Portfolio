import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";
import certi from "../style/mvpCardBody.module.scss";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  handleDelete,
}) {
  const { title = "", description = "", whenDate = " " } = certificate;

  return (
    <div className={certi.mvpBox}>
      <span>{title}</span>
      <br />
      <span>{description}</span>
      <br />
      <span>{whenDate}</span>
      <div className={certi.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={certi.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              edit
            </button>
            <button className={certi.mvpBtn} onClick={handleDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CertificateCard;
