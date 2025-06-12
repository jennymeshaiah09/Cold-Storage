import nodemailer from 'nodemailer';
import cors from 'cors';

const handler = async (req, res) => {
  // Run the cors middleware
  await new Promise((resolve, reject) => {
    cors()(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  // Vercel environment variables are directly available via process.env
  const { name, email, phone, message } = req.body;

  // Ensure this is a POST request
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Configure Nodemailer (ensure these environment variables are set in Vercel)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email to the owner (HTML formatted)
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: 'New Contact Form Submission - Cold Frost Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #00796b;">New Inquiry from Website</h2>
        <p>You have received a new message from your contact form:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
          <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
          <li style="margin-bottom: 8px;"><strong>Phone:</strong> ${phone || 'N/A'}</li>
          <li style="margin-bottom: 8px;"><strong>Message:</strong></li>
        </ul>
        <p style="background-color: #f4f4f4; padding: 10px; border-left: 4px solid #00796b; white-space: pre-wrap;">${message}</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
          This email was sent from the Cold Frost Solutions website.
        </p>
      </div>
    `
  };

  // Email to the user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Request Has Been Sent - Cold Frost Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #00796b;">Thank you for your inquiry, ${name}!</h2>
        <p>Your message has been successfully sent to Cold Frost Solutions. We will review your request and get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p style="background-color: #f4f4f4; padding: 10px; border-left: 4px solid #00796b;">${message}</p>
        <p>In the meantime, feel free to explore more about our services and products on our website.</p>
        <br/>
        <div style="text-align: center; margin-top: 20px;">
          <img src="/imagee.jpg" alt="Cold Frost Logo" style="max-width: 150px; margin-bottom: 10px;"/>
          <p style="font-size: 0.9em; color: #666;">
            <strong>Cold Frost Solutions</strong><br/>
            123 Industrial Area, New Delhi, India 110001<br/>
            Phone: +91 123 456 7890 | Email: info@coldstorage.com
          </p>
        </div>
        <p style="font-size: 0.8em; color: #999; text-align: center;">This is an automated email, please do not reply.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send(error.toString());
  }
};

export default handler; 