import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { BoardContext } from "./BoardContext";
// import MvpButton from "../../MvpButton";

const BoardForm = ({ currentBoard, setIsEditing }) => {
  const userState = useContext(UserStateContext);
  const [form, setForm] = useState({
    title: currentBoard?.title ? currentBoard.title : "",
    context: currentBoard?.context ? currentBoard.context : "",
  });
  const { boards, setBoards } = useContext(BoardContext);

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
        await Api.put(`board/modify/${currentBoard.id}`, {
          userId: currentBoard.userId,
          title: form.title,
          context: form.context,
        });
        setIsEditing(false);
      } else {
        const userId = userState.user.id;
        await Api.post("board/create", {
          userId: userId,
          title: form.title,
          context: form.context,
        }).then(
          setBoards([
            ...boards,
            {
              userId: userId,
              title: form.title,
              context: form.context,
            },
          ])
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={form.title}
        onChange={(e) => handleBoardValue("title", e.target.value)}
      />

      <input
        type="textarea"
        placeholder="내용"
        value={form.context}
        onChange={(e) => handleBoardValue("context", e.target.value)}
      />
      <button type="submit" name="확인">
        확인
      </button>
      {/* <Button
            name="취소"
            onClick={(e) => {
              setIsEditing(false);
            }}
          >
            취소
          </Button> */}
    </form>
  );
};

export default BoardForm;
