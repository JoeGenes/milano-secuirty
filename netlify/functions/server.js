import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fsSync from 'fs';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

dotenv.config();

export const app = express();
const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : (typeof import.meta !== 'undefined' && import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : process.cwd());
const SUPPORT_EMAIL = (process.env.SUPPORT_EMAIL || 'support@milanosecurity.co.tz').trim();

const smtpHost = (process.env.SMTP_HOST || 'mail.milanosecurity.co.tz').trim();
const smtpPort = Number(process.env.SMTP_PORT || 465);
const isSecure = process.env.SMTP_SECURE !== undefined
  ? process.env.SMTP_SECURE === 'true'
  : smtpPort === 465;

const mailTimeoutMs = Number(process.env.SMTP_TIMEOUT_MS || 4000);

const DEFAULT_FROM_EMAIL = process.env.SMTP_FROM ? process.env.SMTP_FROM.trim() : (
  process.env.SMTP_USER ? `Milano Security <${process.env.SMTP_USER.trim()}>` : 'Milano Security <careers@milanosecurity.co.tz>'
);

const getLogoAttachment = () => {
  try {
    const logoPath = path.join(currentDir, '..', '..', 'public', 'favicon.svg');
    if (fsSync.existsSync(logoPath)) {
      return [{ filename: 'logo.svg', path: logoPath, cid: 'logo@milano', contentType: 'image/svg+xml' }];
    }
  } catch (err) {
    console.warn('Unable to load logo attachment:', err);
  }
  return [];
};

const buildEmailTemplate = ({ title = 'Milano Security', preheader = '', bodyHtml = '', logoCid } = {}) => {
  const logoImg = logoCid ? `<img src="cid:${logoCid}" alt="Milano Security" style="height:40px;display:block;margin-bottom:8px;"/>` : '';
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#f3f5f7;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="margin:28px auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6edf3;">
              <tr>
                <td style="background:linear-gradient(90deg,#0A0B3D,#16185E);padding:20px 28px;color:#ffffff;text-align:left;">
                  ${logoImg}
                  <h1 style="margin:0;font-size:18px;letter-spacing:0.02em;">MILANO SECURITY SERVICE LIMITED</h1>
                  <p style="margin:6px 0 0;font-size:13px;opacity:0.95">${preheader}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 28px;color:#0A0B3D;font-size:14px;line-height:1.6;">
                  ${bodyHtml}
                </td>
              </tr>
              <tr>
                <td style="background:#f8fafc;padding:16px 24px;border-top:1px solid #eef2f6;color:#64748b;font-size:13px;">
                  <div>Contact: milanosec351@gmail.com • +255 685 302 141</div>
                  <div style="margin-top:6px">BRELA Reg No. 154815619 • PDPC Reg No. 0-000-010-187</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};

export function buildFallbackMailto(recipient, subjectOrTitle, details = {}) {
  const subjectText = subjectOrTitle ? subjectOrTitle : 'Milano Security Enquiry';
  const subject = encodeURIComponent(subjectText);
  const bodyLines = [];

  if (details.fullName || details.name) bodyLines.push(`Name: ${details.fullName || details.name}`);
  if (details.phone) bodyLines.push(`Phone: ${details.phone}`);
  if (details.email) bodyLines.push(`Email: ${details.email}`);
  if (details.region) bodyLines.push(`Region: ${details.region}`);
  if (details.customerType) bodyLines.push(`Customer Category: ${details.customerType}`);
  if (details.premisesType) bodyLines.push(`Premises Type: ${details.premisesType}`);
  if (details.selectedServices) bodyLines.push(`Services: ${Array.isArray(details.selectedServices) ? details.selectedServices.join(', ') : details.selectedServices}`);
  if (details.urgency) bodyLines.push(`Urgency: ${details.urgency}`);
  if (details.education) bodyLines.push(`Education: ${details.education}`);
  if (details.experience) bodyLines.push(`Experience: ${details.experience}`);
  if (details.positionTitle) bodyLines.push(`Position Applied: ${details.positionTitle}`);
  if (details.positionLocation) bodyLines.push(`Location: ${details.positionLocation}`);
  if (details.coverMessage || details.description || details.details || details.message) {
    bodyLines.push(`Notes / Details: ${details.coverMessage || details.description || details.details || details.message}`);
  }
  bodyLines.push(`Company: ${details.companyName || 'Milano Security'}`);

  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

async function persistSubmission(details) {
  console.log('Submission recorded:', details.email || details.name);
}

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: isSecure,
  auth: {
    user: (process.env.SMTP_USER || 'careers@milanosecurity.co.tz').trim(),
    pass: (process.env.SMTP_PASS || 'Mocu@2026').trim()
  },
  tls: {
    rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === 'true'
  },
  connectionTimeout: mailTimeoutMs,
  greetingTimeout: mailTimeoutMs,
  socketTimeout: mailTimeoutMs
});

const sendMailWithTimeout = async (mailOptions) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`SMTP timeout after ${mailTimeoutMs}ms`)), mailTimeoutMs);
  });

  return Promise.race([transporter.sendMail(mailOptions), timeoutPromise]);
};

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'milano-careers',
    smtpHost: process.env.SMTP_HOST || 'mail.milanosecurity.co.tz',
    smtpPort,
    smtpSecure: isSecure
  });
});

router.get('/admin/verify-smtp', async (req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: 'SMTP connection verified successfully.' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'SMTP connection failed.',
      code: error.code,
      details: error.message
    });
  }
});

router.post('/careers/submit', upload.single('cv'), async (req, res) => {
  try {
    const {
      fullName, phone, email, region, education, experience,
      coverMessage, privacyConsent, positionTitle, positionLocation, companyName
    } = req.body;

    if (!fullName || !phone || !email || privacyConsent !== 'true') {
      return res.status(400).json({ message: 'Please complete the required fields and consent to the privacy notice.' });
    }

    const recipient = process.env.RECEIVER_EMAIL || 'careers@milanosecurity.co.tz';
    const applicantEmail = email.trim();
    const attachments = req.file
      ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }]
      : [];
    const attachmentsWithLogo = attachments.concat(getLogoAttachment());

    const submissionDetails = {
      fullName, phone, email, region, education, experience,
      coverMessage, privacyConsent, positionTitle, positionLocation, companyName, recipient
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

    const companyBody = `
      <p>A new career application has been submitted through the Milano Security recruitment portal.</p>
      <p><strong>Company:</strong> ${companyName || 'Milano Security'}</p>
      <h3 style="margin-top:18px">Applicant Details</h3>
      <p style="margin:6px 0 0">${applicantDetails}</p>
    `;

    const mailOptions = {
      from: DEFAULT_FROM_EMAIL,
      to: recipient,
      replyTo: applicantEmail,
      subject: `New Career Application – ${positionTitle || 'General Enquiry'}`,
      html: buildEmailTemplate({ title: `New Career Application – ${positionTitle || 'General Enquiry'}`, preheader: 'New career application received', bodyHtml: companyBody, logoCid: 'logo@milano' }),
      attachments: attachmentsWithLogo
    };

    try {
      await sendMailWithTimeout(mailOptions);

      if (applicantEmail) {
        const ackBody = `
          <p>Dear ${fullName},</p>
          <p>Thank you for applying to Milano Security. Your application for <strong>${positionTitle || 'the advertised position'}</strong> has been received by our HR team.</p>
          <p>We will review your application and contact you shortly.</p>
          <p>Best regards,<br/>Milano Security HR</p>
        `;

        await sendMailWithTimeout({
          from: DEFAULT_FROM_EMAIL,
          to: applicantEmail,
          subject: 'Your career application has been received',
          html: buildEmailTemplate({ title: 'Application Received', preheader: 'We received your application', bodyHtml: ackBody, logoCid: 'logo@milano' }),
          attachments: getLogoAttachment()
        });
      }

      return res.json({ success: true, message: 'Your application has been delivered successfully to the Milano Security HR inbox.' });
    } catch (smtpError) {
      console.error('SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(recipient, `New Career Application – ${positionTitle || 'General Enquiry'}`, submissionDetails);
      await persistSubmission({ ...submissionDetails, fallbackLink, deliveryStatus: 'saved-fallback' });

      return res.json({
        success: true,
        fallbackMode: true,
        mailtoLink: fallbackLink,
        message: 'Your application was received. Your email app will open with a draft for HR so you can send it directly if the mail server is unavailable.'
      });
    }
  } catch (error) {
    console.error('Career submission failed:', error);
    return res.status(500).json({ success: false, message: 'The application could not be submitted right now. Please contact HR directly.' });
  }
});

router.post('/contact/submit', async (req, res) => {
  try {
    const { name, phone, email, message, privacyConsent } = req.body;
    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedEmail = String(email || '').trim();
    const trimmedMessage = String(message || '').trim();
    const consentGiven = privacyConsent === true || privacyConsent === 'true' || privacyConsent === 'on' || privacyConsent === 'yes' || privacyConsent === '1';

    const missing = [];
    if (!trimmedName) missing.push('name');
    if (!trimmedPhone) missing.push('telephone number');
    if (!trimmedEmail) missing.push('email address');
    if (!trimmedMessage) missing.push('message');
    if (!consentGiven) missing.push('privacy consent');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please complete the required fields: ${missing.join(', ')}.`
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const recipient = SUPPORT_EMAIL;
    const contactBody = `
      <p>A new contact message has been submitted through the Milano Security website.</p>
      <h3 style="margin-top:12px">Contact Details</h3>
      <p><strong>Name:</strong> ${trimmedName}</p>
      <p><strong>Phone:</strong> ${trimmedPhone}</p>
      <p><strong>Email:</strong> ${trimmedEmail}</p>
      <p><strong>Message:</strong><br/>${trimmedMessage.replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: DEFAULT_FROM_EMAIL,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New Contact Form Message from ${trimmedName}`,
      html: buildEmailTemplate({ title: `Contact Form – ${trimmedName}`, preheader: 'New contact form message received', bodyHtml: contactBody, logoCid: 'logo@milano' }),
      attachments: getLogoAttachment()
    };

    try {
      await sendMailWithTimeout(mailOptions);
      await persistSubmission({ type: 'contact', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, message: trimmedMessage, recipient });
      return res.json({ success: true, message: `Your message has been sent to ${recipient}.` });
    } catch (smtpError) {
      console.error('Contact SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(recipient, `Contact Form Message – ${trimmedName}`, { fullName: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: 'Not provided', coverMessage: trimmedMessage, companyName: 'Milano Security' });
      await persistSubmission({ type: 'contact', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, message: trimmedMessage, recipient, fallbackLink, deliveryStatus: 'saved-fallback' });

      return res.json({
        success: true,
        fallbackMode: true,
        mailtoLink: fallbackLink,
        message: `Your message was received and a fallback draft has been prepared for ${recipient}.`
      });
    }
  } catch (error) {
    console.error('Contact submission failed:', error);
    return res.status(500).json({ success: false, message: 'The contact message could not be submitted right now. Please try again later.' });
  }
});

router.post('/support/submit', async (req, res) => {
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
      return res.status(400).json({ success: false, message: `Please complete: ${missing.join(', ')}.` });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const recipient = SUPPORT_EMAIL;
    const senderEmail = trimmedEmail;

    const supportBody = `
      <p>A new support request has been submitted through the Milano Security contact portal.</p>
      <h3 style="margin-top:12px">Request Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${senderEmail}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Details:</strong><br/>${trimmedDetails.replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: DEFAULT_FROM_EMAIL,
      to: recipient,
      replyTo: senderEmail,
      subject: `New Support / Complaint Request from ${name}`,
      html: buildEmailTemplate({ title: `Support Request – ${name}`, preheader: 'New support request received', bodyHtml: supportBody, logoCid: 'logo@milano' }),
      attachments: getLogoAttachment()
    };

    try {
      await sendMailWithTimeout(mailOptions);
      return res.json({ success: true, message: `Your message has been sent to ${recipient}.` });
    } catch (smtpError) {
      console.error('Support SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(recipient, `Support Request – ${name}`, { fullName: name, phone, email: senderEmail, region, coverMessage: details, positionTitle: category, positionLocation: region, companyName: 'Milano Security' });
      await persistSubmission({ name, phone, email: senderEmail, category, region, details, recipient, fallbackLink, deliveryStatus: 'saved-fallback' });

      return res.json({
        success: true,
        fallbackMode: true,
        mailtoLink: fallbackLink,
        message: `Your message was received and a fallback draft has been prepared for ${recipient}.`
      });
    }
  } catch (error) {
    console.error('Support submission failed:', error);
    return res.status(500).json({ success: false, message: 'The support request could not be submitted right now. Please try again later.' });
  }
});

router.post('/quote/submit', async (req, res) => {
  try {
    const {
      customerType, region, premisesType, selectedServices,
      urgency, name, phone, email, description, privacyConsent
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
    // Note: description is optional on frontend form
    if (!consentGiven) missing.push('privacy consent');

    if (missing.length > 0) {
      return res.status(400).json({ success: false, message: `Please complete: ${missing.join(', ')}.` });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@milanosecurity.co.tz';

    const quoteBody = `
      <p>A new quotation request has been submitted through the Milano Security quotation portal.</p>
      <h3 style="margin-top:12px">Quotation Summary</h3>
      <p><strong>Name / Organisation:</strong> ${trimmedName}</p>
      <p><strong>Phone:</strong> ${trimmedPhone}</p>
      <p><strong>Email:</strong> ${trimmedEmail}</p>
      <p><strong>Region:</strong> ${trimmedRegion}</p>
      <p><strong>Customer Category:</strong> ${customerType || 'Not specified'} (${premisesType || 'Not specified'})</p>
      <p><strong>Urgency:</strong> ${urgency || 'Standard'}</p>
      <p><strong>Requested Services:</strong> ${(selectedServices || []).join(', ') || 'None selected'}</p>
      <p><strong>Description / Instructions:</strong><br/>${(trimmedDescription || 'No additional instructions provided').replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: DEFAULT_FROM_EMAIL,
      to: SALES_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Quotation Request from ${trimmedName}`,
      html: buildEmailTemplate({ title: `Quotation Request – ${trimmedName}`, preheader: 'New quotation request received', bodyHtml: quoteBody, logoCid: 'logo@milano' }),
      attachments: getLogoAttachment()
    };

    try {
      await sendMailWithTimeout(mailOptions);
      await persistSubmission({ type: 'quotation', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: trimmedRegion, customerType, premisesType, selectedServices, urgency, description: trimmedDescription, recipient: SALES_EMAIL });
      return res.json({ success: true, message: `Your quotation request has been sent to ${SALES_EMAIL}.` });
    } catch (smtpError) {
      console.error('Quotation SMTP delivery failed, switching to fallback:', smtpError);
      const fallbackLink = buildFallbackMailto(SALES_EMAIL, `Quotation Request – ${trimmedName}`, {
        fullName: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        region: trimmedRegion,
        customerType,
        premisesType,
        selectedServices,
        urgency,
        coverMessage: trimmedDescription
      });
      await persistSubmission({ type: 'quotation', name: trimmedName, phone: trimmedPhone, email: trimmedEmail, region: trimmedRegion, customerType, premisesType, selectedServices, urgency, description: trimmedDescription, recipient: SALES_EMAIL, fallbackLink, deliveryStatus: 'saved-fallback' });

      return res.json({ success: true, fallbackMode: true, mailtoLink: fallbackLink, message: `Your request was received; a fallback draft for ${SALES_EMAIL} has been prepared.` });
    }
  } catch (error) {
    console.error('Quotation submission failed:', error);
    return res.status(500).json({ success: false, message: 'The quotation request could not be submitted right now. Please try again later.' });
  }
});

app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/server')) {
    req.url = req.url.replace('/.netlify/functions/server', '') || '/';
  } else if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '') || '/';
  }
  next();
});

app.use('/', router);

export const handler = serverless(app);

