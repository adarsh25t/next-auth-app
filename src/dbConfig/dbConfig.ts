import mongoose from "mongoose";

export async function connect() {
    try {
        
        await mongoose.connect("mongodb+srv://adarshoffice25t:TuWtba2zNM89LEAi@cluster0.k4ldhlk.mongodb.net/nextapp?retryWrites=true&w=majority")
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log("database connected successfully!");
        });

        connection.on('error', (err) => {
            console.log('connection error!', err);
            process.exit()
        })
        
    } catch (error) {
        console.log("something goes wrong!");
        console.log(error);
        
    }
}    