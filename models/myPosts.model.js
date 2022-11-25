import {Schema, model, Types} from 'mongoose'

const myPost = new Schema({
    login: {type: String, required: true},
    img: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    like: {type: Number, default: 0},
    hashtag: {type: String, required: true},
    data: {type: Date, default: Date.now()},
    owner: {type: Types.ObjectId, ref: 'user'}
})

export default model('myPost', myPost)