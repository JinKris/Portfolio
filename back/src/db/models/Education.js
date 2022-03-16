import { EducationModel } from "../schemas/Education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = EducationModel.create(newEducation)
    return createdNewEducation;
  }


  static async findById({ education_id }) {
    const user = await EducationModel.findOne({ id: education_id });
    return user;
  }

  static async findByUserID(user_id) {
    const users = await EducationModel.find({user_id:user_id});
    return users;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const filter = { id: education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}



export { Education };
