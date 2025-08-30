// utils/emailService.js
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

exports.sendReplyEmail = async (
  to,
  subject,
  message,
  originalMessage = null
) => {
  try {
    const transporter = createTransporter();

    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2563eb;">Response from Village Administration</h2>
          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-top: 15px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
    `;

    if (originalMessage) {
      htmlContent += `
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
          <h3 style="color: #4b5563; margin-bottom: 10px;">Your original message:</h3>
          <div style="background-color: white; padding: 15px; border-radius: 4px;">
            <p style="font-style: italic;">${originalMessage}</p>
          </div>
        </div>
      `;
    }

    htmlContent += `
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
          This is an automated response. Please do not reply to this email.
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"Village Administration" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error: error.message };
  }
};
