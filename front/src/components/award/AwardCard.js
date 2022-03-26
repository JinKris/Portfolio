import * as Api from "../../api";
import MvpButton from "../../MvpButton";

import aw from "../style/mvpCardBody.module.scss";

const AwardCard = ({ award, isEditable, setIsEditing, handleDelete }) => {
  const { title = "", description = "" } = award;

  return (
    <div className={aw.mvpBox}>
      <span>{title}</span>
      <br />
      <span>{description}</span>
      <div className={aw.mvpBtnBox}>
        {isEditable && (
          <>
            <button
              className={aw.mvpBtn}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              edit
            </button>
            <button className={aw.mvpBtn} onClick={handleDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AwardCard;
