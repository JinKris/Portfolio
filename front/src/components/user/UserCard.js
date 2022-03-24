import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
// import axios, { Axios } from "axios";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const userState = useContext(UserStateContext);

  // useEffect(() => {
  //   const res = Api.get("likelist", user.id);
  //   if (res.data.giveLike.find((v) => v === userState.user.id))
  //     setIsLiked(true);
  //   else setIsLiked(false);
  // }, []);

  useEffect(() => {
    async function fetchLikeList() {
      if (!user) return;
      const res = await Api.get("likelist", user.id);

      if (res.data.giveLike.find((v) => v === userState.user.id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      setLikes(res.data.likes);
    }
    fetchLikeList();
  }, [isLiked]);

  const handleLikes = async () => {
    //중복X
    try {
      if (isLiked) {
        await Api.post("like/delete", {
          giveLike: userState.user.id,
          getLike: user.id,
        });
      } else {
        await Api.post("like/create", {
          giveLike: userState.user.id,
          getLike: user.id,
        });
      }
      setIsLiked(!isLiked);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/250/250"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Card.Text>{`likes: ${likes}`}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <>
            <Card.Link
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              포트폴리오
            </Card.Link>
            <button onClick={handleLikes}>Likes </button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
