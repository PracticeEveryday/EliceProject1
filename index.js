// import export를 쓸때는 뒤에 .js 확장자 무조건 줘야한닷!!

import { app } from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(3000, console.log(`${PORT}번 포트 온!`));
