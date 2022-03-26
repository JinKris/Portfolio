import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Boards from "./Boards";
import BoardForm from "./BoardForm";
import { UserStateContext } from "../../App";
import styles from "../style/box.module.scss";
import Header from "../Header";

function BoardBox() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // const isEditable = true;
  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
      <Header />
      <div className={styles.boardBox}>
        <BoardForm />
        <Boards />
      </div>
    </>
  );
}

export default BoardBox;
