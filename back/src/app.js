import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { projectRouter } from "./routers/projectRouter";
import { eduRouter} from "./routers/educationRouter"
import { awardRouter } from "./routers/awardRouter";


const app = express();


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});


app.use(userAuthRouter);

app.use(certificateRouter);
app.use(projectRouter);
app.use(awardRouter);
app.use(eduRouter)


app.use(errorMiddleware);

export { app };

