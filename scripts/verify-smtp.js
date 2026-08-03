import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns/promises';

dotenv.config();

async function runSmtpVerification() {
  console.log('--- MILANO SECURITY SMTP VERIFICATION ---');

  const host = (process.env.SMTP_HOST || 'mail.milanosecurity.co.tz').trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;
  const user = (process.env.SMTP_USER || 'careers@milanosecurity.co.tz').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const rejectUnauthorized = process.env.SMTP_REJECT_UNAUTHORIZED === 'true';

  console.log('Configuration Settings:');
  console.log({
    host,
    port,
    secure,
    user: user || '(not set)',
    passProvided: Boolean(pass),
    rejectUnauthorized
  });

  console.log('\nStep 1: Checking DNS resolution for host:', host);
  try {
    const addresses = await dns.lookup(host);
    console.log(`[PASS] Host resolved to IP: ${addresses.address}`);
  } catch (dnsErr) {
    console.error(`[FAIL] DNS Lookup failed for ${host}:`, dnsErr.message);
    console.error('Hint: Make sure SMTP_HOST in .env is spelled correctly and is a valid mail server (e.g. smtp.gmail.com or mail.yourdomain.com).');
    process.exit(1);
  }

  console.log('\nStep 2: Connecting to SMTP server...');
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  });

  try {
    await transporter.verify();
    console.log('[PASS] SMTP Connection and Authentication Successful!');
  } catch (smtpErr) {
    console.error('[FAIL] SMTP Connection Verification Failed:');
    console.error('Code:', smtpErr.code);
    console.error('Message:', smtpErr.message);

    if (smtpErr.code === 'EAUTH' || smtpErr.responseCode === 535) {
      console.error('\nHint: Authentication failed. Check SMTP_USER and SMTP_PASS. If using Gmail, make sure to use an App Password, not your regular Google password.');
    } else if (smtpErr.code === 'ESOCKET' || smtpErr.code === 'ETIMEDOUT') {
      console.error('\nHint: Connection timed out. Check if SMTP_PORT and SMTP_SECURE match (port 465 requires secure=true, port 587 requires secure=false). Also check hosting firewall rules.');
    } else if (smtpErr.message.includes('certificate') || smtpErr.message.includes('self-signed')) {
      console.error('\nHint: TLS Certificate Error. Set SMTP_REJECT_UNAUTHORIZED=false in .env if using a custom/self-signed SSL host.');
    }
    process.exit(1);
  }
}

runSmtpVerification();
