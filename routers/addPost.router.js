
import authTokenMiddleWare from "../middleWare/authToken.middleWare.js";
import {v4 as uuidv4} from "uuid";
import myPostsModel from "../models/myPosts.model.js";
import {Router} from 'express'
import AWS from "aws-sdk";

const router = new Router()

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: "AKIARIBPWSNIVJI36IHG",
        secretAccessKey: "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"
    }
})

router.post('/addPost', authTokenMiddleWare, async (req, res)=> {
    try{
        const {title, desc, hashtag} = req.body

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
                const person = new myPostsModel({
                    login: req.user.userEmail,
                    title,
                    desc,
                    hashtag,
                    img: data.Location,
                })
                await person.save()
                res.status(200).json({message: 'Successfully saved'})
            }
        })
    }catch (err) {
        res.status(400).json({message: 'Error 404 try again'})
    }
})

export default router