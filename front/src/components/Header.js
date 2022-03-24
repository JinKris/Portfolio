import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import styled from "styled-components";
import Tab from "./Tab.js";

const Container = styled.div`
  width: 1920px;
  height: 286px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopLine = styled.div`
  width: 1920px;
  height: 3px;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
`;

const Title = styled.h1`
  width: 204px;
  height: 65px;
  font-style: bold;
  font-weight: 400;
  font-size: 81.6636px;
  line-height: 111px;
  color: #000000;
  margin-top: 42px;
`;

Header.defaultProps = {
  title: "Portfolio",
};

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Container activeKey={location.pathname}>
      <TopLine />
      <Title>{title}</Title>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/")}>My</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>Net</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Container>
  );
}

export default Header;
