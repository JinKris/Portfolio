import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api"
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [awards, setProjects] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
    Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
            <Project
            key={award.id}
            award={award}
            setAwards={setProjects}
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
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
