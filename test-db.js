const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function run() {
  console.log("URI:", process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log("Connected");
  } catch (e) {
    console.error("Error:", e.message);
  }
  process.exit(0);
}
run();
