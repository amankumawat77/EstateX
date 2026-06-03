import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "yourDatabaseName", // optional
    });

    console.log("MongoDB Connected");
    return handler(req, res);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default connectDb;