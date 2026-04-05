import nodemailer, { type Transporter, SendMailOptions } from 'nodemailer';
import { env } from '../../config/env.js';
import logger from '../../config/logger.js';

const transporter: Transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

type EmailTemplate = {
  subject: string;
  html: string;
};

const buildVerificationEmail = (token: string): EmailTemplate => {
  const url = `${env.APP_URL}/verify-email?token=${token}`;

  return {
    subject: 'Verify your email',
    html: `
      <div style="font-family:sans-serif">
        <h2>Verify your email</h2>
        <p>Click the button below to verify your account:</p>
        <a href="${url}" style="
          display:inline-block;
          padding:10px 20px;
          background:#000;
          color:#fff;
          text-decoration:none;
          border-radius:5px;
        ">
          Verify Email
        </a>
        <p>If you didn’t create this account, ignore this.</p>
      </div>
    `,
  };
};

interface EmailService {
  sendVerificationEmail(email: string, token: string): Promise<void>;
}

export const emailService: EmailService = {
  async sendVerificationEmail(email, token) {
    const { subject, html } = buildVerificationEmail(token);

    const mailOptions: SendMailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    if (env.NODE_ENV !== 'production') {
      logger.info(`Verify URL: ${env.APP_URL}/verify-email?token=${token}`);
    }
  },
};
