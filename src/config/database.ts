import mongoose from "mongoose";


const connectDB = async() =>{

        const mogoUrl = process.env.mongo_Url;
        if(!mogoUrl){
            console.error('MongoDB URI is not provided.');
            throw new Error('MongoDB URI is not provided.');
        }
        await mongoose.connect(mogoUrl);
        console.log("Database Connected");

}

export default connectDB;