import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MongoDB uri is not configured in .env files");
  }

  await mongoose.connect(uri);
  console.log("DB connected...");
};
