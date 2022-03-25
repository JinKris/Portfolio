import React, { useEffect, useState } from "react";
import { BoardContext } from "./BoardContext";
// import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Board from "./Board";
// import BoardForm from "./BoardForm";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    Api.get("boardlist").then((res) => setBoards(res.data.boards));
  }, []);

  return (
    <BoardContext.Provider value={{ boards, setBoards }}>
      <div>
        <div>
          <div>---------------------------</div>
          {boards.map((board) => (
            <Board key={board?.id} board={board} />
          ))}
          <div>---------------------------</div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default Boards;
