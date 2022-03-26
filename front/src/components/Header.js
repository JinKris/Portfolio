import React, { useContext, Component } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";

import header from "./Header.module.css";

function Header() {
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
    navigate("/main");
  };

  return (
    <nav activeKey={location.pathname}>
      <p className={header.topline} />
      <a className={header.logout} onClick={logout}>
        logout
      </a>
      <h1 className={header.title}>Portfolio</h1>

      <li className={header.list1}>
        <Link to="/" className={header.My}>
          My
        </Link>
        <Link to="/network" className={header.Net}>
          Net
        </Link>
        <Link to="/forum" className={header.Board}>
          Board
        </Link>
      </li>
      <p className={header.middleline} />

      {/* {isLogin && <li></li>} */}
    </nav>
  );
}

export default Header;
