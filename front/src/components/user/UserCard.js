import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import axios, { Axios } from "axios";

function UserCard({ user, setIsEditing, isEditable, isNetwork, isLiking }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // Api.get("likelist", user?.id).then((res) => {
  //   let likes = res.data.likes;
  // });
  const deleteLikes = async () => {
    console.log(`Bearer ${sessionStorage.getItem("userToken")}`);
    try {
      // let result = await Api.delete("like/delete", {
      //   giveLike: userState.user.id,
      //   getLike: user.id,
      // });

      const result = await axios.delete(
        "http://localhost:5001/like/delete",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        },
        {
          giveLike: userState.user.id,
          getLike: user.id,
        }
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLikes = async () => {
    try {
      let res = await Api.post("like/create", {
        giveLike: userState.user.id,
        getLike: user.id,
      });
      console.log(res.data.errorMessage);
      if (res.data.errorMessage === "이미 좋아요를 눌렀습니다") {
        // console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
        // DELETE http://localhost:5001/like/delete/[object%20Object]
        // Api.post("like/create", {
        //   giveLike: userState.user.id,
        //   getLike: user.id,
        // });
        console.log(`Bearer ${sessionStorage.getItem("userToken")}`);
        // res = await axios.delete(
        //   "http://localhost:5001/like/delete",
        //   {
        //     giveLike: userState.user.id,
        //     getLike: user.id,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        //     },
        //   }
        // );

        // console.log(res);
        // res = Api.get("likelist", user?.id);
        // console.log(`delete실행, ${user.id}의likelist:${res.data}`);
      }
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
        {/* <Card.Text>{likes}</Card.Text> */}

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
            <button onClick={handleLikes}>LikesO</button>
            <button onClick={deleteLikes}>LikesX</button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
