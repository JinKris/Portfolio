import { education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class educationService {
  static async addEdu({ userId,school,major,position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { userId,id,school,major,position };
    console.log("newEducation",newEducation)
    // db에 저장
    const createdNewEducation = await education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }
  static async getEduInfo({ educationId }) {
    const education = await education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 아이디로 학력 기록이 없습니다.";
      return { errorMessage };
    }

    return education;
  }
  static async setEducation({ educationId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let updatedEducation = await education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!updatedEducation) {
      const errorMessage =
        "해당 아이디로 학력 기록이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      updatedEducation = await education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      updatedEducation = await education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      updatedEducation = await education.update({ educationId, fieldToUpdate, newValue });
    }

    return updatedEducation;
  }

  static async getEduUserInfo({ userId }) {
    // 이메일 db에 존재 여부 확인
    console.log("userId:", userId);
    const educationList = await education.findByUserID({ userId });
    console.log("educationList",educationList)

    if (!educationList) {
      const errorMessage =
        "해당 사용자 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return educationList;
  }
  static deleteEducation = async ({ educationId }) => {
    const deleteEducation = await education.deleteById({ educationId });

    if (!deleteEducation) {
      const errorMessage =
        "해당 id를 가진 학력이 없습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
    return {
      sataus: "success",
    };
  };

}

export { educationService };
