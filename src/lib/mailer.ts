import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || 'notifications@rvfitness.local';
const SMTP_PASS = process.env.SMTP_PASS || 'placeholder_password';
const SMTP_FROM = process.env.SMTP_FROM || 'RV Fitness <no-reply@rvfitness.local>';

// Check if credentials are real or placeholder
const isDevelopmentPlaceholder =
  SMTP_PASS === 'placeholder_password' || SMTP_PASS.includes('placeholder');

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (isDevelopmentPlaceholder) {
    console.log(`\n[EMAIL DISPATCH SIMULATOR]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Status: Transmitted in Dev Mode (Simulated)\n`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer dispatch error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function sendInvoiceEmail(to: string, name: string, invoice: {
  invoiceNumber: string;
  planName: string;
  amount: number;
  duration: string;
  date: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #080808; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #FFC62A;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #FFC62A; margin: 0; font-size: 24px; text-transform: uppercase;">RV FITNESS</h1>
        <p style="color: #9E9E9E; font-size: 11px; margin-top: 4px; letter-spacing: 2px;">NARSOBAWADI</p>
      </div>
      <p style="font-size: 14px;">Dear <strong>${name}</strong>,</p>
      <p style="font-size: 13px; color: #cccccc; line-height: 1.6;">
        Welcome to the RV Fitness family! Your membership pass has been activated and your digital invoice is generated below.
      </p>
      <div style="background-color: #121212; border: 1px solid #222222; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #ffffff;">
          <tr>
            <td style="padding: 8px 0; color: #888888;">Invoice Reference:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #FFC62A;">${invoice.invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888888;">Selected Tier:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: bold;">${invoice.planName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888888;">Billing Period:</td>
            <td style="padding: 8px 0; text-align: right;">${invoice.duration}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888888;">Payment Date:</td>
            <td style="padding: 8px 0; text-align: right;">${invoice.date}</td>
          </tr>
          <tr style="border-top: 1px solid #333333;">
            <td style="padding: 12px 0 0 0; font-weight: bold; font-size: 15px;">Total Paid (INR):</td>
            <td style="padding: 12px 0 0 0; text-align: right; font-weight: bold; font-size: 18px; color: #FFC62A;">₹${invoice.amount.toLocaleString('en-IN')}</td>
          </tr>
        </table>
      </div>
      <p style="font-size: 12px; color: #888888; text-align: center; margin-top: 25px;">
        Present your digital member QR or reference number at the front desk when checking into the facility.<br />
        Train with purpose. Transform with discipline.
      </p>
    </div>
  `;

  return sendEmail({
    to,
    subject: `Official Membership Invoice [${invoice.invoiceNumber}] - RV Fitness Narsobawadi`,
    html,
  });
}
