import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
         required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        match:/^[0-9]{10}$/
    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:/^[a-zA-Z0-9._%+-]+@gmail\.com$/

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
}
    ,{timestamps:true}
);

export default mongoose.model('User',userSchema);