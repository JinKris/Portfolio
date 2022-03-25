import { createContext } from "react";

export const BoardContext = createContext({
  userId: "0000000",
  title: "제목",
  context: "내용",
});
