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
    to, // Receiver address
    subject: 'Password Reset', // Subject line
    html, // Email content in HTML format
  };

  // Wrap sendMail in a Promise
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        resolve(info); // Resolve the Promise with the result
      }
    });
  });
};
