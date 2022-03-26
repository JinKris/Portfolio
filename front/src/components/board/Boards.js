import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import Board from "./Board";
import styles from "../style/box.module.scss";

function Boards() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    Api.get("boardlist").then((res) => setBoards(res.data.boards));
  }, []);

  return (
    <div className={styles.boardsBox}>
      {boards.map((board) => (
        <Board key={board?.id} board={board} />
      ))}
    </div>
  );
}

export default Boards;
