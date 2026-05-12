const nodemailer = require('nodemailer')

// ─── Rate limiter (in-memory, per serverless instance) ────────────────────────
// Allows max 5 submissions per IP per 10-minute window.
const RATE_LIMIT_MAX    = 5
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 min in ms
const ipMap = new Map()

function isRateLimited(ip) {
  const now   = Date.now()
  const entry = ipMap.get(ip) || { count: 0, windowStart: now }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW) {
    ipMap.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count++
  ipMap.set(ip, entry)
  return false
}

// ─── Input sanitiser ──────────────────────────────────────────────────────────
// Strips HTML tags so no injected markup ever reaches the email body.
function sanitise(value) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&/g,  '&amp;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .trim()
}

// ─── Allowed enquiry types ────────────────────────────────────────────────────
const VALID_TYPES = new Set([
  'General', 'HOCH Properties', 'HOCH Build',
  'HOCH Interior', 'HOCH Projects', 'Partnership', 'Careers',
])

// ─── Nodemailer transporter ───────────────────────────────────────────────────
// Lazy-initialised and reused across warm serverless invocations.
let _transporter = null
function getTransporter() {
  if (_transporter) return _transporter
  _transporter = nodemailer.createTransport({
    host:           'smtp.zoho.com',
    port:           465,
    secure:         true,       // SSL
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
    pool:           true,       // keep connection alive between requests
    maxConnections: 3,
  })
  return _transporter
}

// ─── HTML builders ────────────────────────────────────────────────────────────
function internalHtml({ name, email, phone, company, type, message }) {
  const year = new Date().getFullYear()
  const row  = (label, value) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);
                 color:#8B6F2E;font-size:11px;letter-spacing:1px;
                 text-transform:uppercase;width:140px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.15);
                 color:#FAF7EF;font-size:14px;line-height:1.6;">
        ${value}
      </td>
    </tr>`

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                background:#0E0D0A;color:#FAF7EF;padding:40px;">
      <div style="border-bottom:1px solid #C9A84C;padding-bottom:20px;margin-bottom:30px;">
        <h2 style="font-size:22px;color:#C9A84C;margin:0;letter-spacing:3px;">HOCH GROUP</h2>
        <p style="color:#8B6F2E;font-size:11px;letter-spacing:2px;margin:6px 0 0;
                  text-transform:uppercase;">New Enquiry Received</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
        ${row('Enquiry Type', type)}
        ${row('Full Name',    name)}
        ${row('Email',
          `<a href="mailto:${email}"
              style="color:#C9A84C;text-decoration:none;">${email}</a>`)}
        ${row('Phone',   phone   || '—')}
        ${row('Company', company || '—')}
      </table>
      <div style="background:rgba(201,168,76,0.05);border-left:2px solid #C9A84C;
                  padding:20px;margin-bottom:30px;">
        <p style="color:#8B6F2E;font-size:11px;letter-spacing:1px;
                  text-transform:uppercase;margin:0 0 10px;">Message</p>
        <p style="color:#E8E0CC;font-size:14px;line-height:1.8;
                  margin:0;white-space:pre-wrap;">${message}</p>
      </div>
      <p style="color:rgba(232,224,204,0.3);font-size:11px;
                text-align:center;margin:0;letter-spacing:1px;">
        © ${year} HOCH GROUP · thehochgroup.com
      </p>
    </div>`
}

function autoReplyHtml({ firstName, type }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                background:#0E0D0A;color:#FAF7EF;padding:40px;">
      <div style="border-bottom:1px solid #C9A84C;padding-bottom:20px;margin-bottom:30px;">
        <h2 style="font-size:22px;color:#C9A84C;margin:0;letter-spacing:3px;">HOCH GROUP</h2>
        <p style="color:#8B6F2E;font-size:11px;letter-spacing:2px;margin:6px 0 0;
                  text-transform:uppercase;">Enquiry Confirmation</p>
      </div>
      <p style="font-size:15px;color:#E8E0CC;line-height:1.8;margin-bottom:16px;">
        Dear ${firstName},
      </p>
      <p style="font-size:15px;color:#E8E0CC;line-height:1.8;margin-bottom:16px;">
        Thank you for reaching out to HOCH Group. We have received your enquiry
        regarding <strong style="color:#C9A84C;">${type}</strong> and a member of
        our team will be in touch within one business day.
      </p>
      <p style="font-size:15px;color:#E8E0CC;line-height:1.8;margin-bottom:30px;">
        In the meantime, feel free to explore our services at
        <a href="https://www.thehochgroup.com"
           style="color:#C9A84C;text-decoration:none;">thehochgroup.com</a>.
      </p>
      <div style="border-top:1px solid rgba(201,168,76,0.15);padding-top:24px;">
        <p style="color:#8B6F2E;font-size:11px;letter-spacing:1px;
                  margin:0 0 6px;text-transform:uppercase;">HOCH Group</p>
        <p style="color:rgba(232,224,204,0.4);font-size:12px;margin:0;line-height:1.8;">
          Accra, Ghana · info@thehochgroup.com · thehochgroup.com
        </p>
      </div>
    </div>`
}

// ─── Main handler ─────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {

  // CORS — only accept requests from your own domain
  const allowedOrigins = [
    'https://www.thehochgroup.com',
    'https://thehochgroup.com',
    'http://localhost:5173',   // vite dev
    'http://localhost:3000',   // vercel dev
  ]
  const origin = req.headers.origin || ''
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin',  origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Vary', 'Origin')
  }

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })

  // Rate limiting
  const ip = ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim()
              || req.socket?.remoteAddress
              || 'unknown'
  if (isRateLimited(ip))
    return res.status(429).json({
      error: 'Too many requests. Please wait a few minutes and try again.',
    })

  // Sanitise every field
  const name    = sanitise(req.body?.name)
  const email   = sanitise(req.body?.email)
  const phone   = sanitise(req.body?.phone)
  const company = sanitise(req.body?.company)
  const type    = VALID_TYPES.has(req.body?.type) ? req.body.type : 'General'
  const message = sanitise(req.body?.message)

  // Server-side validation
  if (!name)
    return res.status(400).json({ error: 'Name is required.' })
  if (!email)
    return res.status(400).json({ error: 'Email is required.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Enter a valid email address.' })
  if (!message)
    return res.status(400).json({ error: 'Please include a message.' })
  if (message.length > 4000)
    return res.status(400).json({ error: 'Message exceeds 4000 characters.' })

  const firstName = name.split(' ')[0]

  try {
    const mailer = getTransporter()

    // Send both emails concurrently
    await Promise.all([
      mailer.sendMail({
        from:    `"HOCH Group Enquiries" <${process.env.ZOHO_USER}>`,
        to:      process.env.ZOHO_USER,
        replyTo: email,
        subject: `New Enquiry: ${type} — ${name}`,
        html:    internalHtml({ name, email, phone, company, type, message }),
      }),
      mailer.sendMail({
        from:    `"HOCH Group" <${process.env.ZOHO_USER}>`,
        to:      email,
        subject: 'We received your enquiry — HOCH Group',
        html:    autoReplyHtml({ firstName, type }),
      }),
    ])

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error('[enquire] SMTP error:', err?.message || err)
    return res.status(500).json({
      error: 'We could not send your message right now. Please email us directly at info@thehochgroup.com.',
    })
  }
}