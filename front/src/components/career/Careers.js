import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Career from "./Career";
import CareerForm from "./CareerForm";

function Careers({ portfolioOwnerId, isEditable, career }) {
  //useState로 career 상태를 생성함.
  const [careers, setCareers] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "careerlist/유저id"로 GET 요청하고, response의 data로 careers를 세팅함.
    Api.get("careerlist", portfolioOwnerId).then((res) => setCareers(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>경력</Card.Title>
          {careers.map((career) => (
            <Career
              key={career?.id}
              career={career}
              setCareers={setCareers}
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
            <CareerForm
              portfolioOwnerId={portfolioOwnerId}
              setCareers={setCareers}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Careers;
