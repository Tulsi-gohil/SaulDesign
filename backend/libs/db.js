const mongoose = require("mongoose");
const dbcon = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected ✅");
  } catch (error) {
    console.error("MongoDB not connected ❌", error);
  }
};

module.exports = dbcon;
