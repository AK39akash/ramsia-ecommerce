import mongoose from "mongoose";


const connectDb = async () => {

    try {

        mongoose.connection.on('connected', () => {
            console.log('DB CONNECTED')
        })
        
        await mongoose.connect(process.env.MONGODB_URI)

    
        
    } catch (error) {
        console.log("MongoDB Error:", error);
    }


}


export default connectDb;