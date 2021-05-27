const express = require("express");
const app = express();
const port = 5230;
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

app.use("/user", userRouter);
app.use("/card", cardRouter);

app.listen(port, () => {
    console.log("서버 시작하자");
})