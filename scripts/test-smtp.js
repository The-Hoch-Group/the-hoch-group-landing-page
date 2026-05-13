/**
 * HOCH Group — Zoho SMTP connection test
 *
 * Run:  node scripts/test-smtp.js
 *
 * Reads ZOHO_USER and ZOHO_PASS from your .env file.
 * Sends a real test email to ZOHO_USER (yourself) so you can
 * confirm delivery before pushing to production.
 */

"use strict";

// Minimal .env parser — no extra deps needed
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) {
        const val = rest
          .join("=")
          .replace(/^['"]|['"]$/g, "")
          .trim();
        if (!process.env[key.trim()]) process.env[key.trim()] = val;
      }
    });
} else {
  console.warn(
    "⚠  No .env file found — falling back to environment variables.\n",
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const nodemailer = require("nodemailer");

const { ZOHO_USER, ZOHO_PASS } = process.env;

// Guard — don't run with missing credentials
if (!ZOHO_USER || !ZOHO_PASS) {
  console.error("\n✖  Missing credentials.\n");
  console.error("   Make sure your .env contains:\n");
  console.error("   ZOHO_USER=you@thehochgroup.com");
  console.error("   ZOHO_PASS=your_app_password\n");
  process.exit(1);
}

console.log("\n──────────────────────────────────────────────");
console.log("  HOCH Group — Zoho SMTP Test");
console.log("──────────────────────────────────────────────");
console.log(`  Sender : ${ZOHO_USER}`);
console.log(`  Host   : smtp.zoho.com:465 (SSL)`);
console.log("──────────────────────────────────────────────\n");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: ZOHO_USER,
    pass: ZOHO_PASS,
  },
});

(async () => {
  // Step 1 — verify the connection
  process.stdout.write("  1. Verifying SMTP connection … ");
  try {
    await transporter.verify();
    console.log("✔  Connected");
  } catch (err) {
    console.log("✖  Failed\n");
    console.error("  Error:", err.message, "\n");
    console.error("  Common causes:");
    console.error(
      "  • Wrong app password (re-generate in Zoho → Security → App Passwords)",
    );
    console.error(
      "  • Two-factor auth not enabled on the Zoho account (required for app passwords)",
    );
    console.error(
      "  • Firewall blocking port 465 — try port 587 with secure:false\n",
    );
    process.exit(1);
  }

  // Step 2 — send a test email to yourself
  process.stdout.write("  2. Sending test email … ");
  try {
    const info = await transporter.sendMail({
      from: `"HOCH Group Test" <${ZOHO_USER}>`,
      to: ZOHO_USER,
      subject: "✔ SMTP test — HOCH Group website",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;padding:32px;
                    background:#0E0D0A;color:#FAF7EF;">
          <h2 style="color:#C9A84C;letter-spacing:3px;margin:0 0 16px;">HOCH GROUP</h2>
          <p style="font-size:15px;line-height:1.8;color:#E8E0CC;margin:0 0 12px;">
            ✔ Your Zoho SMTP configuration is working correctly.
          </p>
          <p style="font-size:13px;color:#8B6F2E;margin:0;">
            Sent via smtp.zoho.com:465 on ${new Date().toUTCString()}
          </p>
        </div>`,
    });
    console.log("✔  Sent");
    console.log(`\n  Message-ID : ${info.messageId}`);
    console.log(
      `  Preview    : ${nodemailer.getTestMessageUrl(info) || "n/a"}`,
    );
  } catch (err) {
    console.log("✖  Failed\n");
    console.error("  Error:", err.message, "\n");
    process.exit(1);
  }

  console.log("\n──────────────────────────────────────────────");
  console.log("  All checks passed. Ready to deploy. ✔");
  console.log("──────────────────────────────────────────────\n");

  process.exit(0);
})();
