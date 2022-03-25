import { Career } from "../db";
import { v4 as uuidv4 } from "uuid";

class CareerService {
  static addCareer = async ({ userId, company, fromDate, toDate }) => {
    const id = uuidv4();
    const newCareer = { id, userId, company, fromDate, toDate };
    const createdCareer = await Career.create(newCareer);
    return createdCareer;
  };

  static getCareer = async ({ userId }) => {
    const Career = await Career.findById({ userId });

    if (!Career) {
      const errorMessage =
        "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }

    return Career;
  };

  static getCareerList = async ({ userId }) => {
    const CareerList = await Career.findByUserId({ userId });
    return CareerList;
  };

  static setCareer = async ({ userId, company, fromDate, toDate }) => {
    let career = await Career.findById({ userId });

    if (!career) {
      const errorMessage =
        "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }

    const updateData = { company, fromDate, toDate };

    if (updateData.company) {
      const updataField = "company";
      const newValue = updateData.company;
      career = await Career.update({ userId, updataField, newValue });
    }
    if (updateData.fromDate) {
      const updataField = "fromDate";
      const newValue = updateData.fromDate;
      career = await Career.update({ userId, updataField, newValue });
    }
    if (updateData.toDate) {
      const updataField = "toDate";
      const newValue = updateData.toDate;
      career = await Career.update({ userId, updataField, newValue });
    }
    return career;
  };

  static deleteCareer = async ({ careerId }) => {
    const deletedData = await Career.deleteById({ careerId });

    if (!deletedData) {
      const errorMessage =
        "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
    return {
      status: "success",
    };
  };
}

export { CareerService };
