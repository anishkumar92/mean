const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect("mongodb://localhost/mean")
.then(()=>{
    console.log("db connected");
})
.catch(()=>{
    console.log('con failed');
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

app.post("/api/posts",(req,res,next)=>{
    const post =new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save();
    res.status(201).json({
        message:"Post added successfully"
    })
})
app.get("/api/posts",(req,res)=>{
const posts=[
    {
        id:"dsada",
        title:"fist title",
        content:"content"
    },
    {
        id:"dsfsaada",
        title:"second title",
        content:"more content"
    }
];

res.status(200).json({
    message:"post fetched",
    posts:posts
});

});


module.exports=app; 