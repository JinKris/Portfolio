import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";

function Certificate({ certificate, setCertificates, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          portfolioOwnerId={certificate.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificates={setCertificates}
        />
      )}
    </>
  );
}

export default Certificate;
