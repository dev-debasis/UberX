import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB Connected !!")
    console.log(`DB HOST: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("MongoDB Connection Failed: ",error)
    process.exit(1)
  }
};

export { connectDB }