// import { Card, Button, Row, Col } from "react-bootstrap";
import MvpButton from "../../MvpButton";
import styles from "../style/box.module.scss";

function BoardCard({ board, isEditable, setIsEditing, handleDelete }) {
  const { title = "", context = "" } = board;

  return (
    <div className={styles.bCard}>
      <span>title: {title}</span>
      <span>{context}</span>
      {isEditable ? (
        <div className={styles.bCardBtns}>
          <button
            className={styles.bCardBtn}
            onClick={() => setIsEditing((prev) => !prev)}
            name="편집"
          >
            edit
          </button>
          <button
            className={styles.bCardBtn}
            onClick={handleDelete}
            name="삭제"
          >
            delete
          </button>
        </div>
      ) : (
        <div className={styles.bCardBtns}></div>
      )}
    </div>
  );
}

export default BoardCard;
