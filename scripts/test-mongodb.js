import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { Vacancy } from '../models/Vacancy.js';

dotenv.config();

// Use Google & Cloudflare DNS for SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.log('Could not override DNS servers:', e.message);
}

const mongoUrl = process.env.MONGO_URL;

console.log('--- TESTING MONGODB CONNECTION ---');
console.log('MongoDB URL configured:', mongoUrl ? (mongoUrl.substring(0, 30) + '...') : '(NOT SET)');

if (!mongoUrl) {
  console.error('[FAIL] MONGO_URL environment variable is missing in .env!');
  process.exit(1);
}

async function testMongo() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('[PASS] Connected to MongoDB successfully!');

    console.log('Fetching vacancies count...');
    const count = await Vacancy.countDocuments();
    console.log(`[PASS] Existing vacancies in MongoDB: ${count}`);

    await mongoose.disconnect();
    console.log('[PASS] Disconnected cleanly.');
  } catch (err) {
    console.error('[FAIL] MongoDB Connection Error:');
    console.error(err);
    process.exit(1);
  }
}

testMongo();
