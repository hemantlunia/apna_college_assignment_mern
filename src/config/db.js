import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGODB CONNECT');
        
    } catch (error) {
        console.error(error.message || "mongoose connect error");
        process.exit(1)
    }
}

export default connectDB;