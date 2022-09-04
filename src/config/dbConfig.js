import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "There is an error while connecting to process.env.MONGO_CLIENT"
      );
    }
    const conn = mongoose.connect(conStr);
    conn && console.log("DB Connected");
  } catch (error) {
    error && console.log(error);
  }
};
