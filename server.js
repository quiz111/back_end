const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
require("dotenv").config();

const {PORT, MONGO_URL} = process.env;

app.use(helmet());  // 보안의 용이한 미들웨어다. 서버를 구축하기 전에 무조건 곁들여주면 좋다.
app.use(bodyParser.json());   // 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어이다. requsest 정보에서 form 이나 json 형태로 된 body를 검사함
app.use(bodyParser.urlencoded({extended: true})); // 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어이다. requsest 정보에서 form 이나 json 형태로 된 body를 검사함
app.use(cookieParser()); // 쿠키를 전달받아서 사용할수 있도록 하는 미들웨어이다. 사용자 인증같은곳에서 쿠키를 검사할때 사용하기때문이다.
app.use(morgan("dev")); // application에서 발생하는 모든 일들을 logging 하는 미들웨어이다.

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log("몽고디비 아틀라스 연결 성공");
}).catch((e) => {
    console.error(e);
})

app.use(expressSession({
    secret: "@XDF@#$#R!@!@!@##!@", 
    resave: false, 
    saveUninitialized: true,
    cookie:{maxAge:(3.6e+6)*24}, // 24시간 뒤 만료(자동 삭제),
}));

app.use("/user", userRouter);
app.use("/card", cardRouter);

app.get("/", (req,res)=> {
    console.log(req.session);
    res.send("안녕");
});
app.listen(PORT, () => {
    console.log(`localhost: ${PORT}`);
});