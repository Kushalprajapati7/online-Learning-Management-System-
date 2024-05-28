import mongoose from "mongoose";


const connectDB = () =>{
    const mogoUrl = process.env.mongo_Url;
    if(!mogoUrl){
        console.error('MongoDB URI is not provided.');
        throw new Error('MongoDB URI is not provided.');
    }
    try{
        mongoose.connect(mogoUrl);
        console.log("Database Connected");
    }
    catch(error){
        console.error('Error connecting to database:', error);
        throw new Error('Error connecting to database');
    }
    
}

export default connectDB;