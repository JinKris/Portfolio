import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    console.log('newEducation',newEducation)
    const createdNewEducation = await EducationModel.create(newEducation)
    return createdNewEducation;
  }


  static async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  static async findByUserID({userId}) {
    console.log(userId)
    const educations = await EducationModel.find({userId:userId});
    return educations;
  }

  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
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
