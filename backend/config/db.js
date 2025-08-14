import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected!");
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
}
