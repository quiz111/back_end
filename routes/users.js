const express = require("express");
const app = express();
const User = require("../models/user");

//회원가입 API
app.post("/join", (req,res) => {
    const user = new User(req.body);
    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    user.save((err, userInfo) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        } else {
            return res.status(200).json({
                success: true,
            })
        }
    })
})

//로그인 API
app.post("/login", (req, res) => {
     //요청한 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                succress: false,
                message: "해당하는 이메일이 존재하지 않습니다."
            })
        } else if (user.password !== req.body.password) {
            return res.json({
                success: false,
                message: "비밀번호가 틀렸습니다."
            })
        } else {
            req.session.email = req.body.email;
            console.log(req.session.email);
            return res.json({
                success: true,
                message: "로그인 성공"
            })
        }
    })
})

//로그아웃 API
app.post("/logout", (req,res) => {
    req.session.destroy();
    console.log(req.session); //세션이 정상적으로 비어있는지 확인하기위한 테스트
    return res.json({
        success: true,
        message: "로그아웃 성공"
    })
})

module.exports = app;