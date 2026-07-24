import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const submissionsDir = path.join(__dirname, 'data', 'submissions');
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@milanosecurity.co.tz';
const DEFAULT_FROM_EMAIL = process.env.SMTP_USER || 'careers@milanosecurity.co.tz';

export function buildFallbackMailto(recipient, positionTitle, details) {
  const subject = encodeURIComponent(`New Career Application – ${positionTitle || 'General Enquiry'}`);
  const bodyLines = [
    `Applicant Name: ${details.fullName || 'Not provided'}`,
    `Phone: ${details.phone || 'Not provided'}`,
    `Email: ${details.email || 'Not provided'}`,
    `Region: ${details.region || 'Not provided'}`,
    `Education: ${details.education || 'Not provided'}`,
    `Experience: ${details.experience || 'Not provided'}`,
    `Position Applied: ${details.positionTitle || 'Not provided'}`,
    `Location: ${details.positionLocation || 'Not provided'}`,
    `Cover Note: ${details.coverMessage || 'No additional note provided'}`,
    `Company: ${details.companyName || 'Milano Security'}`
  ];

  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

async function persistSubmission(details) {
  await fs.mkdir(submissionsDir, { recursive: true });
  const filePath = path.join(submissionsDir, 'applications.json');
  let records = [];

  try {
    const existing = await fs.readFile(filePath, 'utf8');
    records = JSON.parse(existing);
  } catch {
    records = [];
  }

  records.push({
    ...details,
    createdAt: new Date().toISOString()
  });

  await fs.writeFile(filePath, JSON.stringify(records, null, 2));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.milanosecurity.co.tz',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'careers@milanosecurity.co.tz',
    pass: process.env.SMTP_PASS || 'Mocu@2026'
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'milano-careers' });
});

app.post('/api/careers/submit', upload.single('cv'), async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      region,
      education,
      experience,
      coverMessage,
      privacyConsent,
      positionTitle,
      positionLocation,
      companyName
    } = req.body;

    if (!fullName || !phone || !email || privacyConsent !== 'true') {
      return res.status(400).json({ message: 'Please complete the required fields and consent to the privacy notice.' });
    }

    const recipient = process.env.RECEIVER_EMAIL || 'careers@milanosecurity.co.tz';
    const applicantEmail = email.trim();
    const attachments = req.file
      ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }]
      : [];

    const submissionDetails = {
      fullName,
      phone,
      email,
      region,
      education,
      experience,
      coverMessage,
      privacyConsent,
      positionTitle,
      positionLocation,
      companyName,
      recipient
    };

    const applicantDetails = [
      `Applicant Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Region: ${region || 'Not provided'}`,
      `Education: ${education || 'Not provided'}`,
      `Experience: ${experience || 'Not provided'}`,
      `Position Applied: ${positionTitle || 'Not provided'}`,
      `Location: ${positionLocation || 'Not provided'}`,
      `Cover Note: ${coverMessage || 'No additional note provided'}`
    ].join('<br/>');

    const mailOptions = {
      from: `${companyName || 'Milano Security'} <${process.env.SMTP_USER || 'careers@milanosecurity.co.tz'}>`,
      to: recipient,
      replyTo: applicantEmail,
      subject: `New Career Application – ${positionTitle || 'General Enquiry'}`,
      html: `
        <h3>New application received</h3>
        <p>A new career application has been submitted through the Milano Security recruitment portal.</p>
        <p><strong>Company:</strong> ${companyName || 'Milano Security'}</p>
        <p><strong>Applicant Details</strong><br/>${applicantDetails}</p>
      `,
      attachments
    };

    try {
      await transporter.sendMail(mailOptions);

      if (applicantEmail) {
        await transporter.sendMail({
          from: `${companyName || 'Milano Security'} <${process.env.SMTP_USER || 'careers@milanosecurity.co.tz'}>`,
          to: applicantEmail,
          subject: 'Your career application has been received',
          html: `<p>Dear ${fullName},</p><p>Thank you for applying to Milano Security. Your application for <strong>${positionTitle || 'the advertised position'}</strong> has been received by our HR team.</p><p>We will review your application and contact you shortly.</p><p>Best regards,<br/>Milano Security HR</p>`
        });
      }

      res.json({ success: true, message: 'Your application has been delivered successfully to the Milano Security HR inbox.' });
      return;
    } catch (smtpError) {
      console.error('SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(recipient, positionTitle, submissionDetails);
      await persistSubmission({ ...submissionDetails, fallbackLink, deliveryStatus: 'saved-fallback' });

      res.json({
        success: true,
        fallbackMode: true,
        mailtoLink: fallbackLink,
        message: 'Your application was received and saved. Your email app will open with a draft for HR so you can send it directly if the mail server is unavailable.'
      });
      return;
    }
  } catch (error) {
    console.error('Career submission failed:', error);
    res.status(500).json({ success: false, message: 'The application could not be submitted right now. Please contact HR directly.' });
  }
});

app.post('/api/support/submit', async (req, res) => {
  try {
    const { name, phone, email, category, region, details, privacyConsent } = req.body;
    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedEmail = String(email || '').trim();
    const trimmedRegion = String(region || '').trim();
    const trimmedDetails = String(details || '').trim();
    const consentGiven = privacyConsent === true || privacyConsent === 'true' || privacyConsent === 'on' || privacyConsent === 'yes' || privacyConsent === '1';

    const missing = [];
    if (!trimmedName) missing.push('name');
    if (!trimmedPhone) missing.push('telephone number');
    if (!trimmedEmail) missing.push('email address');
    if (!trimmedRegion) missing.push('region');
    if (!trimmedDetails) missing.push('support details');
    if (!consentGiven) missing.push('privacy consent');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please complete: ${missing.join(', ')}.`
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    const recipient = SUPPORT_EMAIL;
    const senderEmail = trimmedEmail;

    const mailOptions = {
      from: `Milano Security <${DEFAULT_FROM_EMAIL}>`,
      to: recipient,
      replyTo: senderEmail,
      subject: `New Support / Complaint Request from ${name}`,
      html: `
        <h3>New support or complaint request</h3>
        <p>A new support request has been submitted through the Milano Security contact portal.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Details:</strong><br/>${details.replace(/\n/g, '<br/>')}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: `Your message has been sent to ${recipient}.` });
      return;
    } catch (smtpError) {
      console.error('Support SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(recipient, 'Support Request', { fullName: name, phone, email, region, education: '', experience: '', coverMessage: details, positionTitle: category, positionLocation: region, companyName: 'Milano Security' });
      await persistSubmission({ name, phone, email: senderEmail, category, region, details, recipient, fallbackLink, deliveryStatus: 'saved-fallback' });

      res.json({
        success: true,
        fallbackMode: true,
        mailtoLink: fallbackLink,
        message: `Your message was received and a fallback draft has been prepared for ${recipient}.`
      });
      return;
    }
  } catch (error) {
    console.error('Support submission failed:', error);
    res.status(500).json({ success: false, message: 'The support request could not be submitted right now. Please try again later.' });
  }
});

app.post('/api/quote/submit', async (req, res) => {
  try {
    const {
      customerType,
      region,
      premisesType,
      selectedServices,
      urgency,
      name,
      phone,
      email,
      description,
      privacyConsent
    } = req.body;

    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedEmail = String(email || '').trim();
    const trimmedRegion = String(region || '').trim();
    const trimmedDescription = String(description || '').trim();
    const consentGiven = privacyConsent === true || privacyConsent === 'true' || privacyConsent === 'on' || privacyConsent === 'yes' || privacyConsent === '1';

    const missing = [];
    if (!trimmedName) missing.push('name');
    if (!trimmedPhone) missing.push('telephone number');
    if (!trimmedEmail) missing.push('email address');
    if (!trimmedRegion) missing.push('region');
    if (!trimmedDescription) missing.push('brief description');
    if (!consentGiven) missing.push('privacy consent');

    if (missing.length > 0) {
      return res.status(400).json({ success: false, message: `Please complete: ${missing.join(', ')}.` });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@milanosecurity.co.tz';

    const mailOptions = {
      from: `Milano Security <${DEFAULT_FROM_EMAIL}>`,
      to: SALES_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Quotation Request from ${trimmedName}`,
      html: `
        <h3>New quotation request</h3>
        <p>A new quotation request has been submitted through the Milano Security quotation portal.</p>
        <p><strong>Name / Organisation:</strong> ${trimmedName}</p>
        <p><strong>Phone:</strong> ${trimmedPhone}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Region:</strong> ${trimmedRegion}</p>
        <p><strong>Customer Category:</strong> ${customerType} (${premisesType})</p>
        <p><strong>Urgency:</strong> ${urgency}</p>
        <p><strong>Requested Services:</strong> ${(selectedServices || []).join(', ')}</p>
        <p><strong>Description / Instructions:</strong><br/>${trimmedDescription.replace(/\n/g, '<br/>')}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      await persistSubmission({ type: 'quotation', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: trimmedRegion, customerType, premisesType, selectedServices, urgency, description: trimmedDescription, recipient: SALES_EMAIL });
      res.json({ success: true, message: `Your quotation request has been sent to ${SALES_EMAIL}.` });
      return;
    } catch (smtpError) {
      console.error('Quotation SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(SALES_EMAIL, 'Quotation Request', { fullName: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: trimmedRegion, coverMessage: trimmedDescription });
      await persistSubmission({ type: 'quotation', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: trimmedRegion, customerType, premisesType, selectedServices, urgency, description: trimmedDescription, recipient: SALES_EMAIL, fallbackLink, deliveryStatus: 'saved-fallback' });

      res.json({ success: true, fallbackMode: true, mailtoLink: fallbackLink, message: `Your request was received; a fallback draft for ${SALES_EMAIL} has been prepared.` });
      return;
    }
  } catch (error) {
    console.error('Quotation submission failed:', error);
    res.status(500).json({ success: false, message: 'The quotation request could not be submitted right now. Please try again later.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Careers mail server listening on port ${port}`);
  });
}

export { app };
