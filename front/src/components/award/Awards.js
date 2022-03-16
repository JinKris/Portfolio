import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState();
  const [awardList, setAwardList] = useState([]);

  useEffect(() => {
    Api.get("awardList", portfolioOwnerId).then((res) =>
      setAwardList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "80rem" }}>
      <Card.Body>
        <Card.Title>수상 이력</Card.Title>

        {awardList.map((award) => (
          <Award
            key={award.id}
            award={award}
            awardList={setAwardList}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwardList={setAwardList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Awards;
