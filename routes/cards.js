const express = require("express");
const app = express();
const Card = require("../models/card.js");

//-------------------------- 추가- Create-----------------------
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

//-------------------------- 조회- Read-----------------------
//세션에 있는 이메일로 카드 가져오기
app.post("/read-card-email", (req,res) => {
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
app.post("/read-card-keyword", (req,res) => {
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
//-------------------------- 변경- Update-----------------------
//id값을 이용해 카드 변경
app.post("/update-card", (req, res) => {
    Card.findOneAndUpdate({id: req.body.id},{
        title: req.body.title,
        description: req.body.description,
        word: req.body.word,
        mean: req.body.mean,
        }, {upsert:true}, (err, items) => {
        if(err) {
            return res.json({
                success: false,
                message: "카드 변경을 실패했습니다."
            })
        } else {
            return res.json({
                success: true,
                messaage: "카드 변경을 완료하였습니다."
            })
        }
    })
})

//-------------------------- 삭제- Delete-----------------------
//id값을 이용해 삭제하기 API
app.post("/delete-card", (req, res) => {
    Card.deleteOne({id:req.body.id}, (err, success) => {
        if (err) {
            return res.json({
                success: false,
                message:"삭제 할 수 없습니다."
            })
        } else {
            return res.json({
                success: true,
                message: "삭제 성공"
            })
        }
    });
})
module.exports = app;