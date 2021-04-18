import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import data from '../data.js';
import { generateToken, isAuth } from '../utils.js';
import nodemailer from 'nodemailer';
const userRouter=express.Router();
userRouter.get('/seed', expressAsyncHandler(async (req,res)=>{
    // await User.remove({});
    const createdUsers= await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
    const user=await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({message: 'Invalid email or password'});
}));

userRouter.post('/register', expressAsyncHandler(async(req, res)=>{
    const user= new User({name:req.body.name, email:req.body.email, password:bcrypt.hashSync(req.body.password, 8)});
    const createdUser=await user.save();
    res.send({
        _id:createdUser._id,
        name:createdUser.name,
        email:createdUser.email,
        isAdmin:createdUser.isAdmin,
        token:generateToken(createdUser),
    })

})
)

userRouter.put('/create-password', expressAsyncHandler(async(req, res)=>{
    const user= await User.findOne({email: req.body.email})
    if(user){
        if(req.body.password === req.body.confirmPassword){
            user.password=bcrypt.hashSync(req.body.password, 8)
            user.save()
            res.send({user:user})
        }else{
            res.send({message:'Password does not match'})
        }

       

    }else{
        res.send({message:'Users Not Found'})
    }
}))


userRouter.post('/resetPassword', expressAsyncHandler(async(req,res)=>{
   const user=await User.findOne({email:req.body.email})
   if(user){
    const token= generateToken(user)
    user.token=token
    user.save()
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "satyamvatsk@gmail.com",
          pass: "",
          clientId: "904881742347-stucs4tkirbuiap5tv0sjbo2407rbg5h.apps.googleusercontent.com",
          clientSecret: "KqSVxhUN_26IL7pGtNomtmTL",
          refreshToken: "1//04_IPMzYNLtVSCgYIARAAGAQSNwF-L9Irw8ShzBlym7Vtdl5dZ099A8SJA3nQC0cIS0xbX7VKANKwpATdMLEtxF7drrTbtRZGXJQ",
          accessToken: "ya29.a0AfH6SMAI9M07yWM9J3M7M4Jq3gUSCPsStaaIvXdEfO0kWkHrOXCmrFzioLErOXM5hAVdsL7P8C76Khx_MmzRzKe7LXw5FqhqYkkOKG1HIJvZFoIjWmgsJsEOGk_RIrmLdr9R3bR08_2ucl5gqE92nTRd_SDH"
        },
       });
       
       transporter.verify((err, success) => {
        err
          ? console.log(err)
          : console.log(`=== Server is ready to take messages: ${success} ===`);
       });
       
       let mailOptions = {
        from: "satyamkumar.github@gmail.com",
        to: user.email,
        subject: "Reset Password",
        html: `
        <p>You have made request for password reset.</p>
        <div> Click Link <a href="http://localhost:3000/forgot-password/${token}/email=${user.email}">Reset Password</a></div>
        `,
        
       };
       
       transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
       });
    
 res.send({message:'Mail Sent!'})
 
   }
       
   
}))


userRouter.get('/:id', expressAsyncHandler(async (req, res)=>{
    const user =await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message:'User Not Found'});
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=bcrypt.hashSync(req.body.password, 8)

        }

        const updatedUser=await user.save()
        res.send({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser)
        })
    }
}))
export default userRouter;