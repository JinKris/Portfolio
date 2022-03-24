import React, { useEffect, useState } from "react";
import { CertificateContext } from "./CertificateContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import MvpButton from "../../MvpButton";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <CertificateContext.Provider value={{ certificates, setCertificates }}>
      <Card>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          {certificates.map((certificate) => (
            <Certificate
              key={certificate?.id}
              certificate={certificate}
              isEditable={isEditable}
            />
          ))}
          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <MvpButton onClick={() => setIsAdding(true)} name="+" />
              </Col>
            </Row>
          )}
          {isAdding && (
            <CertificateForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </CertificateContext.Provider>
  );
}

export default Certificates;
