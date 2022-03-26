import React, { useState, useContext } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { BoardContext } from "./BoardContext";
import styles from "../style/box.module.scss";

const BoardForm = ({ currentBoard, isEditing, setIsEditing }) => {
  const userState = useContext(UserStateContext);
  const [form, setForm] = useState({
    title: currentBoard?.title ? currentBoard.title : "",
    context: currentBoard?.context ? currentBoard.context : "",
  });
  const { boards = [], setBoards } = useContext(BoardContext) || {};

  const handleBoardValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (setIsEditing) {
        await Api.put(`boards/${currentBoard.id}`, {
          userId: currentBoard.userId,
          title: form.title,
          context: form.context,
        });
        setIsEditing(false);
        await Api.get("boardlist").then((res) => setBoards(res.data.boards));
      } else {
        await Api.post("board/create", {
          userId: userState.user.id,
          title: form.title,
          context: form.context,
        }).then;
        setBoards([
          ...boards,
          {
            userId: userState.user.id,
            title: form.title,
            context: form.context,
          },
        ])();
        // await Api.get("boardlist").then((res) => setBoards(res.data.boards));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.bForm} onSubmit={handleSubmit}>
      <input
        className={styles.boardInput}
        type="text"
        placeholder="title"
        value={form.title}
        onChange={(e) => handleBoardValue("title", e.target.value)}
      />

      <textarea
        className={styles.boardInput}
        type="textarea"
        placeholder="context"
        value={form.context}
        onChange={(e) => handleBoardValue("context", e.target.value)}
      />
      <div className={styles.bFormBtns}>
        <button
          className={styles.bFormBtn}
          onClick={handleSubmit}
          name="submit"
        >
          submit
        </button>
        {isEditing && (
          <button
            className={styles.bFormBtn}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            name="submit"
          >
            back
          </button>
        )}
      </div>
    </form>
  );
};

export default BoardForm;
