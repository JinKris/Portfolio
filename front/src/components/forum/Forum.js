import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Boards from "./Boards";
import BoardForm from "./BoardForm";
import Header from "../Header";
import { UserStateContext } from "../../App";

function Forum() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const isEditable = true;
  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div>
      <Header />
      <h1>Forum</h1>
      <Container fluid>
        <Row xs="auto" className="jusify-content-center">
          <Boards />
          <BoardForm />
        </Row>
      </Container>
    </div>
  );
}

export default Forum;
