import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET='helloencrypt';

export async function SignUp(req,res){
    const {name,email,phoneNumber,password}=req.body;

    if(!name || !email|| !phoneNumber||!password){
       return res.status(400).json({success:false,message:"Few details are missing"});
    }
    try{
        const existinguser=await User.findOne({$or: [{ email }, { phoneNumber}]});
        
        if(existinguser){
            //res.status(200).send({success:true,message:"User already exists"});
           return res.status(409).json({success:false,message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({name , email , phoneNumber,password:hashedPassword}) 
        await user.save();

        const token =jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'10m'});
            /* res.cookie("token",token,{
            httpOnly:true, // cant access via js
            secure:process.env.NODE_ENV === 'production',
            sameSite:'none',
            maxAge: 10*60 * 1000
        });  */


        return res.status(201).json({success:true,message:"User Created Sucessfully",/* token, */ user:{id:user._id,name:user.name , email:user.email, phoneNumber:user.phoneNumber}});
    }catch(err){
       return res.status(500).json({success:false,message:err.message})
    }
}
export const Login =async(req,res)=>{
   const{email,password}=req.body;
   if(!email||!password){
      return res.status(400).json({success:false,message:"Few details are missing"});
   }
   try{
      const user =await User.findOne({email});
      if(!user){
        return res.status(404).json({success:false,message:"User not found"});
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
         return res.status(401).json({success:false,message:"Invalid credentials"});
      }
      
      const token =jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'10m'});

       /*  res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'none',
            maxAge: 10*60* 1000
        });  */
        res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 10 * 60 * 1000
});

        return res.status(200).json({success:true,message:"Login Successful",/* token, */user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }});

   }catch(err){
      return res.status(500).json({success:false,message:err.message});
   }
}