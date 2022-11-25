import {Schema, model, Types} from 'mongoose'


const UserModel = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    userName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    myPost: {type: Types.ObjectId, ref: 'myPost'}
})

export default model('user', UserModel)