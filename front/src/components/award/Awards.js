import React, { useState, useEffect } from "react";
import { AwardContext } from "./AwardContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardForm from "./AwardForm";
import MvpButton from "../../MvpButton";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <AwardContext.Provider value={{ awards, setAwards }}>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {awards.map((award) => (
            <Award key={award?.userId} award={award} isEditable={isEditable} />
          ))}
          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <MvpButton onClick={() => setIsAdding(true)} name="+" />
              </Col>
            </Row>
          )}
          {isAdding && (
            <AwardForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </AwardContext.Provider>
  );
};

export default Awards;
