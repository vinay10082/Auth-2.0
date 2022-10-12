import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

import users from '../models/auth.js'
import otplibAuthenticator from '../config/otplib.js'

export const signup = async (req, res) => {
    try{
        
    const {name, email, password } = req.body;

        email = email.toLowerCase();

        const existinguser = await users.findOne({ email });

        if(existinguser && !existinguser.verified){

            const otp = otplibAuthenticator.generate(existinguser.email);

            const mailData = {
                from: "20bph043@gmail.com",
                to: existinguser.email,
                subject: `Your OTP is ${otp}`,
                text: `Your OTP for MERN Authentication is ${otp}`
              };

              const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: '20bph043@gmail.com',
                  pass: 'cxgbolskbphccuoq'
                }
              }))
            
                transporter.sendMail(mailData, function(error, res){
                  if (error) {
                    console.log(error)
                  }else{
                  return res.json({
                      success: true,
                      msg: "User already exists. OTP sent to your email.",
                      existinguser
                    })
                  }
                })

        }

            if (existinguser && existinguser.verified) {
                return res.status(404).json({ message: "User already Exist."})
              }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await users.create({name, email, password: hashedPassword }) 

        const otp = otplibAuthenticator.generate(newUser.email);

        const mailData = {
          from: "20bph043@gmail.com",
          to: newUser.email,
          subject: `Your OTP is ${otp}`,
          text: `Your OTP for MERN Authentication is ${otp}`
        };
    
        try {
            await mailgunHelper.messages().send(mailData);
          } catch (err) {
            console.log(err);
        }
    
        return res.json({
          success: true,
          msg: "User created successfully. OTP sent to your email.",
          newUser
        });
    } catch(error){
        res.status(500).json("Something went worng...")
    }
}

export const verifyOtp = async (req, res) => {
    try {

      let { email, otp } = req.body;
  
      email = email.toLowerCase();
  
      const existinguser = await users.findOne({ email });
  
      if (existinguser && !existinguser.verified) {
        const isValid = otplibAuthenticator.verify({
          token: otp,
          secret: existinguser.email
        });
  
        if (!isValid) {
          return res.status(404).json({ message: "Invalid OTP. Please check OTP and try again."})
        }
  
        existinguser.verified = true;
  
        await existinguser.save();
  
        const jwtToken = jwt.sign(
          { _id: String(existinguser._id), email: existinguser.email },
          "test",
          { expiresIn: "24h" }
        ); // expires in 24 hours
  
        return res.json({
          success: true,
          msg: "Registered successfully. Logged in successfully.",
          user: existinguser,
          jwt: jwtToken
        });
      }
  
      if (existinguser && existinguser.verified) {
        return res.status(404).json({ message: "User already exists. Please login."})
        
      }

      return res.status(404).json({ message: "User not found. Please signup."})
        
    } catch (err) {
      console.log(err);
    }
  };

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if(!existinguser){
            return res.status(404).json({ message: "User don't Exist."})
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message : "Invalid credentials"})
        }
        const token = jwt.sign({ email: existinguser.email, id:existinguser._id},"test", { expiresIn: '1h'});
        res.status(200).json({ result: existinguser, token })
    } catch (error)  {
        res.status(500).json("Something went worng...")
    }
}