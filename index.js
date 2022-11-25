import express, {json} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import registerRouter from "./routers/register.router.js"
import authRouter from "./routers/auth.router.js"
import postRouter from "./routers/post.router.js"
import addPostRouter from "./routers/addPost.router.js"
import getAllPostsRouter from "./routers/getAllPosts.router.js"
import getPackPostsRouter from "./routers/getPackPosts.router.js"

const PORT = process.env.PORT || 8081

const app = express()

mongoose.connect('mongodb+srv://ali:python20050302@cluster0.zwglizl.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log('Server successfully connected'))
    .catch((err)=> console.log('Error server do not connected', err))

app.use(cors())
app.use(json())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use('/api',
    registerRouter,
    authRouter,
    postRouter,
    addPostRouter,
    getAllPostsRouter,
    getPackPostsRouter
)

app.get('/test', (req, res)=> {
    res.send('Server is working')
})

app.listen(PORT, ()=> console.log(`Server has been started on PORT: ${PORT}`))