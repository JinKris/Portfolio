import is from "@sindresorhus/is"; // ?무엇인지?
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { educationService } from "../services/educationService";

const eduRouter = Router();
eduRouter.use(loginRequired)

eduRouter.post(
    "/education/create", 
    async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
        throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
        );
        }

        // req (request) 에서 데이터 가져오기
        const userId = req.body.userId;
        const school = req.body.school;
        const major = req.body.major;
        const position = req.body.position;

        // 위 데이터를 education db에 추가하기
        const newEducation = await educationService.addEdu({
        userId,
        school,
        major,
        position, 
        });

        if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
        }

        res.status(201).json(newEducation);
    } catch (error) {
        next(error);
    }
});
// education 항목 아이디별 확인
eduRouter.get(
    "/educations/:id",
    async function (req, res, next) {
      try {
        const educationId = req.params.id;
        const currentEduInfo = await educationService.getEduInfo({ educationId });
  
        if (currentEduInfo.errorMessage) {
          throw new Error(currentEduInfo.errorMessage);
        }
  
        res.status(200).send(currentEduInfo);
      } catch (error) {
        next(error);
      }
    }
  );
  
// education ID 별 수정변경
eduRouter.put(
  "/educations/:id",
  async function (req, res, next) {
    try {
      // URI로부터 education id를 추출함.
      const educationId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      //const userId = req.body.userId ?? null;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      // 해당 education id로 education 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedEducation = await educationService.setEducation({ educationId, toUpdate });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

eduRouter.get(
    "/educationlist/:userId",
    async function (req, res, next) {
      try {
        const userId = req.params.userId;
        const currentEduUserInfo = await educationService.getEduUserInfo({ userId });
  
        if (currentEduUserInfo.errorMessage) {
          throw new Error(currentEduUserInfo.errorMessage);
        }
  
        res.status(200).send(currentEduUserInfo);
      } catch (error) {
        next(error);
      }
    }
  );
  eduRouter.delete("/educations/:id", async (req, res, next) => {
    try {
      const educationId = req.params.id;
      console.log(educationId);
  
      const result = await educationService.deleteEducation({ educationId });
  
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
  
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });
// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
eduRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { eduRouter };
