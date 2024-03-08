const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    profile:{
    type:String,
    required:false,
    default:"https://res.cloudinary.com/dvcma7mex/image/upload/v1709867902/pngegg_fdpihj.png"   
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)

