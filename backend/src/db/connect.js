import mongoose from "mongoose";

const connect = async () => {

    try {
        console.log("Attempting to connect to databace......");
        await mongoose.connect(process.env.MONGO_URI , {});
        console.log("Connected to database.....");
    } catch (error) {
        console.log("Failded to connect to database....." , error.message); 
        process.exit(1);
    }
    
};

export default connect;