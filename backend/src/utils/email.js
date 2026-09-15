import nodemailer from 'nodemailer';

export const sendPasswordOtpEmail = async (email, otp) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP email settings are not configured');
  }

  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const sendPromise = transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Exam Saarthi password reset OTP',
    text: `Your Exam Saarthi password reset OTP is ${otp}. It expires in 10 minutes. If you did not request this, you can ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #172554;">
        <h2>Exam Saarthi password reset</h2>
        <p>Use the following one-time password to reset your account password:</p>
        <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2563eb; margin: 24px 0;">${otp}</div>
        <p>This OTP expires in <strong>10 minutes</strong> and can be used only once.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('SMTP request timed out')), 20000);
  });

  return Promise.race([sendPromise, timeoutPromise]);
};
