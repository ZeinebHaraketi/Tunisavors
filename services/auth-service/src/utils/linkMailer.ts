// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export const sendEmail = async ({ to, subject, html }: { 
//   to: string; 
//   subject: string; 
//   html: string 
// }) => {
//   await transporter.sendMail({
//     from: `"TuniSavors" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };

// emailService.ts

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // Ne pas mettre true ici, sinon ça force TLS sur le mauvais port
  auth: {
    user: '8a2b52001@smtp-brevo.com', // <- identifiant que tu vois dans le screenshot
    pass: 'sVwG40MSmjxTpbyH' // <- le mot de passe que tu as généré
  }
});


export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  await transporter.sendMail({
    from: '"TuniSavors" <tunisavors@gmail.com>',
    to,
    subject,
    html,
  });
};
