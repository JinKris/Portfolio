import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/mainPage.module.scss";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Portfolio</h1>
      <div>
        <button
          className={styles.signIn}
          onClick={() => navigate("/login", { replace: false })}
        >
          signIn
        </button>
        <button
          className={styles.signUp}
          onClick={() => navigate("/register", { replace: false })}
        >
          signUp
        </button>
      </div>
    </div>
  );
}

export default MainPage;
