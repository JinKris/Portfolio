import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardForm from "./AwardForm";

const Awards = ({ portfolioOwnerId, isEditable, award }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [awardLists, setAwardLists] = useState([]);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) =>
      setAwardLists(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "80rem" }}>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awardLists.map((award) => (
          <Award
            key={award?.userId}
            award={award}
            setAwardLists={setAwardLists}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4 me-2">
            <Col sm={{ span: 40 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <AwardForm
            portfolioOwnerId={portfolioOwnerId}
            setAwardLists={setAwardLists}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Awards;
