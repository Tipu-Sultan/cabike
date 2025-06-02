import nodemailer from 'nodemailer';

// Initialize Nodemailer transporter
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email template
export const verificationEmailTemplate = (fullName, verificationUrl) => `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: #2563eb; color: #ffffff; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; }
    .content p { font-size: 16px; color: #333333; line-height: 1.5; }
    .button { display: inline-block; padding: 12px 24px; background: #2563eb; color:rgb(21, 17, 17); text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; color: #666666; }
    @media (max-width: 600px) { .content { padding: 15px; } .button { padding: 10px 20px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Cabike!</h1>
    </div>
    <div class="content">
      <p>Hi ${fullName},</p>
      <p>Thank you for joining Cabike, our platform for buying and selling cars and bikes! Please verify your email address to activate your account.</p>
      <a href="${verificationUrl}" class="button">Verify Your Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    </div>
    <div class="footer">
      <p>© 2025 Cabike. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Function to send verification email
export const sendVerificationEmail = async (email, fullName, verificationUrl) => {
  try {
    await transporter.sendMail({
      from: `"Cabike" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verify Your Cabike Account',
      html: verificationEmailTemplate(fullName, verificationUrl),
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};