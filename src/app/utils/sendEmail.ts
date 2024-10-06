import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string,  html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  const mailData = {
    from: config.email_user, 
    to, 
    subject: 'Password Reset', 
    html, 
  };

  // Wrap sendMail in a Promise
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err); 
      } else {
        resolve(info); 
      }
    });
  });
};
