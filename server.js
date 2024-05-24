const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Article=require("./models/article");
const methodOverRide=require("method-override");

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB Connected..."))
    .catch((err)=>console.log(err));

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverRide("_method"))

app.use("/articles",require("./routes/articles"));


app.get("/",async(req,res)=>{
    const articles=await Article.find().sort({
        createdAt:"desc"
    });
    res.render("articles/index",{
        articles
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server lsitining on port ${PORT}`));
