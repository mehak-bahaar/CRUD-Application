const mongoose = require("mongoose")
const mongooseURI = "mongodb://localhost:27017/";
const connectToMongoose = () =>{
    mongoose
      .connect(mongooseURI)
      .then(() => {
        console.log("Connected to mongoose successfully");
      })
      .catch((error) => {
        console.error("Error connecting to mongoose:", error);
      });
}



module.exports = connectToMongoose