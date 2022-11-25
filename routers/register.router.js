import {Router} from 'express'
import bcrypt from 'bcryptjs'
import {check, validationResult} from 'express-validator'
import UserModel from "../models/user.model.js"
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: "AKIARIBPWSNIVJI36IHG",
        secretAccessKey: "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"
    }
})

const router = new Router()

router.post('/register',  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
],async (req, res)=> {
    try{
        const error = validationResult(req)
        if (!error.isEmpty()){
            return res.status(400).json({
                errors: error.array(),
                message: 'min: 6'
            })
        }

        const {login, userName, password, lastName, age, phoneNumber, email} = req.body

        if(!login.length && !password.length && !lastName.length && !age.length && !phoneNumber.length && !userName.length, !email.length) {
            return res.status(200).json({message: 'Please enter login and password'})
        }

        let person = await UserModel.findOne({email})
        let loginPerson = await UserModel.findOne({login})

        if(person) return res.status(200).json({message: 'This email is busy'})
        if(loginPerson) return res.status(200).json({message: 'This login is busy'})

        const hashPassword = await bcrypt.hash(password, 12)


        const uniqId = uuidv4()

        const uploadParams = {
            Bucket: 'compleximage',
            Key: `${uniqId}${req.files.img.name}`,
            Body: Buffer.from(req.files.img.data),
            ContentType: req.files.img.mimeType,
            ACL: 'public-read'
        }

        await s3.upload(uploadParams, async (err, data)=> {
            err && console.log("Error Img", err)
            if(data) {
                person = new UserModel({
                    login,
                    img: data.Location,
                    email,
                    userName,
                    lastName,
                    age,
                    phoneNumber,
                    password: hashPassword
                })
                await person.save()
                res.status(200).json({message: 'Successfully saved'})

            }
        })

    }catch (err){
        res.status(400).json({message: `Error 404 try again`})
    }
})

export default router