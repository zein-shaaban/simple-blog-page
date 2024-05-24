const mongoose=require("mongoose");
const slugify=require("slugify");
const {marked}=require("marked");
const CreateDomPurify=require("dompurify");
const {JSDOM}=require("jsdom");
const dompurify=CreateDomPurify(new JSDOM().window)

const articleScema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:{
        type:String,
        required:true
    }
})

articleScema.pre("validate",function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true})
    }

    if(this.markdown){
        this.sanitizedHtml=dompurify.sanitize(marked(this.markdown))
    }


    next();
})

module.exports=mongoose.model("Article",articleScema);