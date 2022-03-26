// ES6 : import export를 쓸때는 뒤에 .js 확장자 무조건 줘야한닷!! + type : module필수   "type": "module",
// babel? 필요없음 이제

import { app } from "./src/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(3000, console.log(`${PORT}번 포트 온!`));
