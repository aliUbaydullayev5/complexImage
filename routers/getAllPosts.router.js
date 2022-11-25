import {Router} from 'express'
import myPostsModel from "../models/myPosts.model.js";

const router = new Router()

router.get('/getAllPosts', async (req, res)=> {
    try{
        const posts = await myPostsModel.find()
        res.status(202).json(posts)
    }catch (err) {
        res.status(400).json({message: 'Error 400 try again'})
    }
})

export default router