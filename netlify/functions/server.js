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
  const logoImg = logoCid ? `<img src="cid:${logoCid}" alt="Milano Security" style="height:44px;display:block;margin-bottom:10px;"/>` : '';
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#eef2f6;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f6;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
              <!-- Gold Top Accent Strip -->
              <tr>
                <td style="background:#E7AD18;height:4px;font-size:0;line-height:0;">&nbsp;</td>
              </tr>
              <!-- Executive Navy Header -->
              <tr>
                <td style="background:linear-gradient(135deg, #0A0B3D 0%, #16185E 100%);padding:24px 32px;color:#ffffff;text-align:left;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td valign="middle">
                        ${logoImg}
                        <h1 style="margin:0;font-size:19px;font-weight:800;letter-spacing:0.04em;color:#ffffff;">MILANO SECURITY SERVICE LIMITED</h1>
                        <p style="margin:4px 0 0;font-size:12px;color:#E7AD18;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Reliable Security &bull; Trusted Protection</p>
                      </td>
                    </tr>
                  </table>
                  ${preheader ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.15);font-size:13px;color:rgba(255,255,255,0.9);">${preheader}</div>` : ''}
                </td>
              </tr>
              <!-- Main Email Content -->
              <tr>
                <td style="padding:28px 32px;color:#1e293b;font-size:14px;line-height:1.6;">
                  ${bodyHtml}
                </td>
              </tr>
              <!-- Executive Footer -->
              <tr>
                <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td valign="top" style="color:#475569;">
                        <strong style="color:#0A0B3D;font-size:13px;">MILANO SECURITY SERVICE LIMITED</strong><br/>
                        Dodoma HQ: Hazina Ward, Kinyambwa Road, Dodoma, Tanzania<br/>
                        Official Email: <a href="mailto:info@milanosecurity.co.tz" style="color:#2563eb;text-decoration:none;">info@milanosecurity.co.tz</a> &bull; Hotline: <strong style="color:#0A0B3D;">+255 685 302 141 / +255 758 556 355</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:12px;margin-top:12px;border-top:1px dashed #cbd5e1;font-size:11px;color:#94a3b8;">
                        BRELA Reg No. 154815619 &bull; PDPC Reg No. 0-000-010-187 &bull; Police Authorised Security Provider
                      </td>
                    </tr>
                  </table>
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

    const servicesListHtml = (selectedServices && selectedServices.length > 0)
      ? selectedServices.map(s => `<span style="display:inline-block;background:#e2e8f0;color:#0A0B3D;font-weight:600;font-size:12px;padding:4px 10px;border-radius:16px;margin:2px 4px 4px 0;">🛡️ ${s}</span>`).join('')
      : '<span style="color:#64748b;font-style:italic;">None specified</span>';

    const isHighPriority = urgency === 'High' || urgency === 'Immediate' || urgency === 'Urgent';
    const urgencyColor = isHighPriority ? '#dc2626' : '#2563eb';
    const urgencyBg = isHighPriority ? '#fef2f2' : '#eff6ff';

    const quoteBody = `
      <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <!-- Header Banner Card -->
        <div style="background:#f8fafc;border-left:4px solid #E7AD18;padding:16px 20px;margin-bottom:24px;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:#64748b;text-transform:uppercase;margin-bottom:4px;">INCOMING SALES ENQUIRY</div>
          <div style="font-size:18px;font-weight:800;color:#0A0B3D;">New Quotation Request</div>
          <div style="font-size:13px;color:#475569;margin-top:2px;">Submitted via Milano Security Quotation Portal</div>
        </div>

        <!-- Executive Grid Table -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-collapse:collapse;">
          <tr>
            <td width="50%" valign="top" style="padding-right:10px;">
              <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:16px;">
                <h4 style="margin:0 0 12px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0A0B3D;border-bottom:2px solid #E7AD18;padding-bottom:6px;">👤 Client Information</h4>
                <table width="100%" style="font-size:13px;line-height:1.7;">
                  <tr><td style="color:#64748b;width:90px;">Client Name:</td><td><strong style="color:#0f172a;">${trimmedName}</strong></td></tr>
                  <tr><td style="color:#64748b;">Phone:</td><td><a href="tel:${trimmedPhone}" style="color:#2563eb;text-decoration:none;font-weight:700;">${trimmedPhone}</a></td></tr>
                  <tr><td style="color:#64748b;">Email:</td><td><a href="mailto:${trimmedEmail}" style="color:#2563eb;text-decoration:none;">${trimmedEmail}</a></td></tr>
                  <tr><td style="color:#64748b;">Region:</td><td><strong style="color:#0A0B3D;">${trimmedRegion}</strong></td></tr>
                </table>
              </div>
            </td>
            <td width="50%" valign="top" style="padding-left:10px;">
              <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:16px;">
                <h4 style="margin:0 0 12px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0A0B3D;border-bottom:2px solid #0A0B3D;padding-bottom:6px;">🏢 Premises & Priority</h4>
                <table width="100%" style="font-size:13px;line-height:1.7;">
                  <tr><td style="color:#64748b;width:100px;">Customer Type:</td><td><strong style="color:#0f172a;">${customerType || 'Not specified'}</strong></td></tr>
                  <tr><td style="color:#64748b;">Premises:</td><td><strong style="color:#0f172a;">${premisesType || 'Not specified'}</strong></td></tr>
                  <tr><td style="color:#64748b;">Priority Level:</td><td><span style="display:inline-block;background:${urgencyBg};color:${urgencyColor};font-weight:700;font-size:11px;padding:2px 8px;border-radius:4px;border:1px solid ${urgencyColor}40;">${urgency || 'Standard'} Priority</span></td></tr>
                </table>
              </div>
            </td>
          </tr>
        </table>

        <!-- Requested Services Card -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:16px;margin-bottom:20px;">
          <h4 style="margin:0 0 10px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0A0B3D;">🛡️ Requested Security Services</h4>
          <div>${servicesListHtml}</div>
        </div>

        <!-- Detailed Notes Card -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:16px;margin-bottom:24px;">
          <h4 style="margin:0 0 8px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0A0B3D;">📝 Site Requirements & Description</h4>
          <div style="font-size:13px;color:#334155;line-height:1.6;background:#f8fafc;padding:12px;border-radius:6px;border:1px solid #e2e8f0;white-space:pre-wrap;">${trimmedDescription || 'No additional instructions provided.'}</div>
        </div>

        <!-- Direct Action Bar -->
        <div style="text-align:center;padding:12px 0;">
          <a href="mailto:${trimmedEmail}?subject=RE:%20Milano%20Security%20Quotation%20Request%20–%20${encodeURIComponent(trimmedName)}" style="display:inline-block;background:#0A0B3D;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 24px;border-radius:6px;margin-right:10px;box-shadow:0 2px 6px rgba(10,11,61,0.2);">✉️ Reply to ${trimmedName}</a>
          <a href="tel:${trimmedPhone}" style="display:inline-block;background:#E7AD18;color:#0A0B3D;text-decoration:none;font-weight:800;font-size:13px;padding:12px 24px;border-radius:6px;box-shadow:0 2px 6px rgba(231,173,24,0.3);">📞 Call ${trimmedPhone}</a>
        </div>
      </div>
    `;

    const mailOptions = {
      from: DEFAULT_FROM_EMAIL,
      to: SALES_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Quotation Request – ${trimmedName} (${trimmedRegion})`,
      html: buildEmailTemplate({ title: `Quotation Request – ${trimmedName}`, preheader: `Quotation Request received from ${trimmedName} in ${trimmedRegion}`, bodyHtml: quoteBody, logoCid: 'logo@milano' }),
      attachments: getLogoAttachment()
    };

    try {
      await sendMailWithTimeout(mailOptions);

      // Automated Executive Acknowledgment Email to Client
      if (trimmedEmail) {
        const clientAckBody = `
          <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <p style="font-size:15px;color:#0A0B3D;margin-top:0;">Dear <strong>${trimmedName}</strong>,</p>
            <p style="font-size:14px;color:#334155;line-height:1.6;">
              Thank you for choosing <strong>Milano Security Service Limited</strong>. We have successfully received your quotation request for security services in <strong>${trimmedRegion}</strong>.
            </p>
            
            <div style="background:#f8fafc;border-left:4px solid #0A0B3D;padding:16px 20px;margin:20px 0;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Summary of Your Request</div>
              <table width="100%" style="font-size:13px;color:#0f172a;margin-top:8px;line-height:1.7;">
                <tr><td style="color:#64748b;width:120px;">Target Region:</td><td><strong>${trimmedRegion}</strong></td></tr>
                <tr><td style="color:#64748b;">Customer Category:</td><td><strong>${customerType || 'General Security'} (${premisesType || 'Standard'})</strong></td></tr>
                <tr><td style="color:#64748b;">Selected Services:</td><td><strong>${(selectedServices || []).join(', ') || 'Custom Security Package'}</strong></td></tr>
              </table>
            </div>

            <p style="font-size:14px;color:#334155;line-height:1.6;">
              Our dedicated sales & risk assessment team is reviewing your requirements. A Milano Security sales representative will reach out to you shortly via <strong>${trimmedPhone}</strong> or email to arrange a site assessment and present your tailored quotation.
            </p>

            <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;color:#475569;">
              <strong style="color:#0A0B3D;">Need immediate urgent assistance?</strong><br/>
              Contact our 24/7 Operational Headquarters Control Room:<br/>
              <strong style="color:#0A0B3D;font-size:15px;display:inline-block;margin-top:4px;">📞 +255 758 556 355 / +255 685 302 141</strong>
            </div>
          </div>
        `;

        await sendMailWithTimeout({
          from: DEFAULT_FROM_EMAIL,
          to: trimmedEmail,
          subject: 'Quotation Request Received – Milano Security',
          html: buildEmailTemplate({ title: 'Quotation Confirmation', preheader: 'We received your quotation request', bodyHtml: clientAckBody, logoCid: 'logo@milano' }),
          attachments: getLogoAttachment()
        }).catch(err => console.warn('Client quotation ack email warning:', err.message));
      }

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

