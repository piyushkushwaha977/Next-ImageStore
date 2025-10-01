import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if( !MONGODB_URL ){
    throw new Error(
        "Please define the Monogdb Connection environment variable or String"
    )
}

let cached = global.mongoose;

console.log(cached);

if(!cached){
    cached = global.mongoose = { conn:null , promise:null };
}

export async function connectToDb() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose
            .connect(MONGODB_URL,{maxPoolSize:10})
            .then( () => mongoose.connection)
    };

    try {
        cached.conn = await cached.promise
        
    } catch (error) {
        console.log("Error while connecting to DB")
        throw error
    }

    return cached.conn;
}



