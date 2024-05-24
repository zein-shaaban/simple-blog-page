const express=require("express");
const Article=require("../models/article");
const router=express.Router();

router.route("/new").get((req,res)=>{
    res.render("articles/new",{article:new Article()})
})

router.route("/:slug").get(async(req,res)=>{
    const article=await Article.findOne({slug:req.params.slug});
    if(!article)return res.redirect("/")
        console.log(article)
    res.render("articles/show",{article})
})

router.route("/edit/:id").get(async(req,res)=>{
    const article=await Article.findById(req.params.id);
    res.render("articles/edit",{article})
})

router.route("/").post(async(req,res)=>{
     let article=new Article({
            title:req.body.title,
            description:req.body.description,
            markdown:req.body.markdown
        })
    try {
        article=await article.save();
        res.redirect(`/articles/${article.slug}`)
    } catch (error) {
        console.log(error)
        res.render("articles/new",{article:article})
    }
})

router.route("/:id").put(async(req,res)=>{
    let article=await Article.findById(req.params.id);
    article.title=req.body.title;
    article.description=req.body.description;
    article.markdown=req.body.markdown
try {
    article=await article.save();
    res.redirect(`/articles/${article.slug}`)
} catch (error) {
    console.log(error)
    res.render("articles/edit",{article:article})
}
}
)

router.delete("/:id",async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/")
})

module.exports=router