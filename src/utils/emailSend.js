import nodemailer from "nodemailer";
import { config } from "../config/config.js";

async function sendEmail(emailTo,emailSubject,emailText) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {user: config.SMTP_USER, pass: config.SMTP_PASS},
    tls: {rejectUnauthorized: false},
  });

  let option=
  {
    from: 'Mern E-commerce👻 <sd@team.email>',
    to: emailTo, 
    subject: emailSubject, 
    text: emailText, 
    
  }
  const info = await transporter.sendMail(option);

  console.log("Message sent: %s", info.messageId);
  
}

export {sendEmail}