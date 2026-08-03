import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 465);
const secure = process.env.SMTP_SECURE !== undefined 
  ? process.env.SMTP_SECURE === 'true' 
  : port === 465;
const user = process.env.SMTP_USER || 'milanosec351@gmail.com';
const pass = process.env.SMTP_PASS || '';

console.log('Testing SMTP configuration:');
console.log({
  host,
  port,
  secure,
  user: user ? user : '(not set)',
  passProvided: Boolean(pass),
  rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === 'true'
});

if (!pass) {
  console.log('\n[WARNING] SMTP_PASS is empty. In production, set SMTP_PASS in .env file!');
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  tls: {
    rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === 'true'
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

transporter.verify((error, success) => {
  if (error) {
    console.error('\nSMTP Verification Result: FAILED');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error(error);
  } else {
    console.log('\nSMTP Verification Result: SUCCESS');
  }
});
