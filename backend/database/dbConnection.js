import mongoose, { mongo } from "mongoose";

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "PORTFOLIO",
        })
        .then(() => {
            console.log("Connected to the Database");
        })
        .catch((error) => {
            console.log(
                `Some error occured while connecting to the Database: ${error}`
            );
        });
};

export default dbConnection;
