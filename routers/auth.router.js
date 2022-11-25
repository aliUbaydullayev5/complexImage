import {Router} from 'express'
import {check, validationResult} from "express-validator";
import bcrypt from 'bcryptjs'
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const router = new Router()


router.post('/auth',[
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пороль').exists()
], async (req, res)=> {
    try{
        const error = validationResult(req)

        if (!error.isEmpty()){
            return res.status(400).json({
                errors: error.array(),
                message: 'min: 6'
            })
        }

        const {email, password} = req.body


        const user = await userModel.findOne({email})

        if (!user) return res.status(400).json({message: 'User not found'})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({message: 'Invalid password'})

        const token = jwt.sign(
            {userEmail: user.email},
            'sekret key',
            {expiresIn: '15d'}
        )

        const {login, img, userName, lastName, age, phoneNumber} = user

        res.json({token, login, img, userName, lastName, age, phoneNumber})

    }catch (err){
        res.status(400).json({message: 'Error 404 try again'})
    }
})




export default router