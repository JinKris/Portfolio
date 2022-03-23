import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Projects from "./project/Projects";
import Certificates from "./certificate/Certificates";
import Educations from "./education/Educations";
import Awards from "./award/Awards";

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <div>this is a main page</div>
      <button onClick={() => navigate("/login", { replace: true })}>
        login
      </button>
    </>
  );
}

export default MainPage;
