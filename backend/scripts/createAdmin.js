import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@tealeaf.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists!");
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: "admin@tealeaf.com",
      password: "admin123",
      role: "admin",
      phone: "+91-1234567890",
      address: "TeaLeaf HQ, India",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@tealeaf.com");
    console.log("🔑 Password: admin123");
    console.log("⚠️ Change password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdminUser();
