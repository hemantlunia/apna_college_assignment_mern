import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        topic:{type:mongoose.Schema.Types.ObjectId,
            ref:"Topic",
            required:true
        },
        title:{type:String,required:true},
        difficulty:{
            type:String,
            enum:['Easy','Medium','Hard'],
            required:true
        },
        youtubeLink:String,
        leetcodeLink:String,
        articleLink:String
    },{timestamps:true}
)

const Problem = mongoose.model("Problem",problemSchema)

export default Problem;