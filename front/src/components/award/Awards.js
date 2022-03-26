import React, { useState, useEffect } from "react";
import { AwardContext } from "./AwardContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardForm from "./AwardForm";
import MvpButton from "../../MvpButton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
