const express = require("express");
const app = express();
const Card = require("../models/card.js");

//카드 만들기 API
app.post("/create-card", (req, res) => {
    const card = new Card(req.body);
    
    card.save((err, cardInfo) => {
        if (err) {
            return res.json({
                success: false,
                message: "카드 만들기 에러",
                err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "카드만들기 성공"
            })
        }
    })
})

//세션에 있는 이메일로 카드 가져오기
app.post("/email-search", (req,res) => {
    Card.find({creater: req.session.email}, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: "email로 가져올 카드가 없습니다."
            })
        } else {
            console.log(user);
            return res.json(user);
        }
    })
})

//키워드로 카드 가져오기 API
app.post("/keyword-search", (req,res) => {
    Card.find({"$text": {"$search": req.body.title}}, (err, card) => {
        if(err) {
            console.log(err);
            return res.json({
                success: false,
                message: "검색 실패"
            });
        } else {
            console.log(card);//테스트 코드
            return res.json(card);
        }
    })
})

module.exports = app;