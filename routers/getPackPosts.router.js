import {Router} from 'express'
import myPostsModel from "../models/myPosts.model.js"

const router = new Router()

router.post('/getPackPost', async (req, res)=> {
    try{
        const unnecessaryPosts = req.body?.post
        const allPosts = await myPostsModel.find()

        const elementSelector = (arr, unnecessary = []) => {
            const randomNumber = () => Math.floor(Math.random() * arr.length)
            const result = []
            const packValue = arr.length - unnecessary.length > 5 ? 5 : arr.length - unnecessary.length
            while (result.length !== packValue) {
                const uniqValue = arr[randomNumber()]
                if(!unnecessary.includes(uniqValue._id.toString())){
                    unnecessary.push(uniqValue._id.toString())
                    result.push(uniqValue)
                }
            }
            return result
        }
        let result = elementSelector(allPosts, unnecessaryPosts)
        res.json(result)
    }catch (err) {
        res.status(400).json({message: `Error 400 try again`})
    }
})

export default router