import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Instantiate reusable SMTP transporter pool using Gmail SMTP
export const mailer = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: false, // true for port 465, false for other ports (587)
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD
  }
});

// Verify SMTP connection pool stability on initialization
mailer.verify((error) => {
  if (error) {
    console.error('[SMTP Connection Error]:', error);
  } else {
    console.log('[SMTP Server Ready]: Connection pool established successfully');
  }
});

export const fromAddress = env.MAIL_FROM_ADDRESS;