import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static addCertificate = async ({ userId, title, description, whenDate }) => {
    const id = uuidv4();
    const newCertificate = { id, userId, title, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  };

  static getCertificate = async ({ certificateId }) => {
    const certificate = await Certificate.findById({ certificateId });
    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  };

  static getCertificateList = async ({ userId }) => {
    const certificateList = await Certificate.findByUserId({ userId });
    return certificateList;
  };

  static setCertificate = async ({ certificateId, toUpdate }) => {
    let certificate = await Certificate.findById({ certificateId });

    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.whenDate) {
      const fieldToUpdate = "whenDate";
      const newValue = toUpdate.whenDate;
      certificate = await Certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    return certificate;
  };

  static deleteCertificate = async ({ certificateId }) => {
    const isDataDeleted = await Certificate.deleteById({ certificateId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "success" };
  };
}

export { CertificateService };
