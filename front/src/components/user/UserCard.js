import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

// import axios, { Axios } from "axios";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  //변수에 넣는것들은 명확하게.. 0...false...  --likes
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userState = useContext(UserStateContext);
  //follow
  // const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [f4f, setF4f] = useState(false);

  //수정 필요 ㅠㅠ fetchLike
  useEffect(() => {
    //likes
    async function fetchLikeList() {
      if (!user) return;
      try {
        const res = await Api.get("likelist", user.id);
        if (res.data.giveLike.find((v) => v === userState.user.id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
        setLikes(res.data.likes);
      } catch (e) {
        console.log(e);
      }
    }

    fetchLikeList();
  }, [isLiked, user]);

  //수정 필요 ㅠㅠ fetchFollow
  useEffect(() => {
    //follow
    async function fetchFollowList() {
      if (!user) return;
      try {
        const res = await Api.get("followlist", user.id);
        if (res.data.follower.find((v) => v === userState.user.id)) {
          if (res.data.following.find((v) => v === userState.user.id)) {
            setF4f(true);
          } else setF4f(false);
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
          setF4f(false);
        }
        setFollower(res.data.followerNumber);
      } catch (e) {
        console.log(e);
      }
    }
    fetchFollowList();
  }, [user, isFollowed, f4f]);

  const handleLikes = async () => {
    if (user.id === userState.user.id) return;
    //수정
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
  const handleFollow = async () => {
    if (user.id === userState.user.id) return;
    //수정
    try {
      if (isFollowed) {
        await Api.post("follow/delete", {
          follower: user.id,
          following: userState.user.id,
        });
        setIsFollowed(false);
      } else if (!isFollowed) {
        await Api.post("follow/create", {
          follower: user.id,
          following: userState.user.id,
        });
        setIsFollowed(true);
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
        <Card.Text>{`likes: ${likes}`}</Card.Text>
        <Card.Text>{`follower: ${follower}`}</Card.Text>
        <Card.Text>{`f4f:${f4f}`}</Card.Text>

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
            <button onClick={handleFollow}>follow </button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
