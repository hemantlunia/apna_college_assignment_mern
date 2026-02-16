import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    problem:{type:mongoose.Schema.Types.ObjectId,ref:'Problem',required:true},
    completed:{type:Boolean,default:false}
},{timestamps:true})

const Progress = mongoose.model('Progress',progressSchema)

export default Progress;