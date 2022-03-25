import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";

function ChangePasswordForm({ user, setChangingPW, setUser }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewpassword, setCheckNewpassword] = useState("");
  const navigate = useNavigate();

  const isPasswordValid = newPassword.length >= 4;
  const isPasswordSame = checkNewpassword === newPassword;
  const CheckAll = isPasswordValid && isPasswordSame;
  ///useMemo... 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    /////newPassword 랑 checknewPassword 검증

    try {
      console.log(currentPassword);
      const res = await Api.post(`users/currentPassword/${user.id}`, {
        currentPassword,
      });
      console.log(res.data);
      if (res.data.result) {
        await Api.put(`users/${user.id}`, {
          newPassword,
        });
        alert("비밀번호 변경 완료!");
        setChangingPW(false);
        navigate("/login");
      } else {
        alert("현재 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mb-2 ms-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              autoComplete="on"
              placeholder="현재 비밀번호"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 4글자 이상입니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={(e) => setCheckNewpassword(e.target.value)}
            />
            {!isPasswordSame && (
              <Form.Text className="text-success">
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                disabled={!CheckAll} //// 비밀번호 일치 확인 안되어있을 시 재입력?
              >
                확인
              </Button>
              <Button variant="secondary" onClick={() => setChangingPW(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePasswordForm;
