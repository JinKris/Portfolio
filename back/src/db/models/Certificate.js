import { certificateModel } from "../schemas/certificate.js";

class Certificate {
  static create = async ({ newCertificate }) => {
    const createdNewCertificate = await certificateModel.create(newCertificate);
    return createdNewCertificate;
  };

  static findById = async ({ certificateId }) => {
    const certificate = await certificateModel.findOne({ id: certificateId });
    return certificate;
  };

  static findByUserId = async ({ userId }) => {
    const certificates = await certificateModel.find({ userId });
    return certificates;
  };

  static update = async ({ certificateId, fieldToUpdate, newValue }) => {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await certificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  };

  static deleteById = async ({ certificateId }) => {
    const deleteResult = await certificateModel.deleteOne({
      id: certificateId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Certificate };
