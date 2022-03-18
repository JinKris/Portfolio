import { certificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await certificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ certificateId }) {
    const certificate = await certificateModel.findOne({ id: certificateId });
    return certificate;
  }

  static async findByUserId({ userId }) {
    const certificates = await certificateModel.find({ userId });
    return certificates;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await certificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async deleteById({ certificateId }) {
    const deleteResult = await certificateModel.deleteOne({
      id: certificateId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Certificate };
