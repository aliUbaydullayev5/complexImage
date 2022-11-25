import {Router} from 'express'
import authTokenMiddleWare from "../middleWare/authToken.middleWare.js"

const router = new Router()


// лайк +
router.post('/deletePost', authTokenMiddleWare, (req, res)=> {

})

// лайк -
router.post('/deletePost', authTokenMiddleWare, (req, res)=> {

})

// удаление поста
router.post('/deletePost', authTokenMiddleWare, (req, res)=> {

})


export default router