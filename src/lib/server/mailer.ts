import nodemailer from 'nodemailer';
import { 
  MAIL_HOST, 
  MAIL_PORT, 
  MAIL_USERNAME, 
  MAIL_PASSWORD, 
  MAIL_FROM_ADDRESS 
} from '$env/static/private';

// Instantiate reusable SMTP transporter pool using Gmail SMTP
export const mailer = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: false, // true for port 465, false for other ports (587)
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD
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

export const fromAddress = MAIL_FROM_ADDRESS;