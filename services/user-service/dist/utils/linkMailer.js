"use strict";
// import nodemailer from 'nodemailer';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // Ne pas mettre true ici, sinon ça force TLS sur le mauvais port
    auth: {
        user: '8a2b52001@smtp-brevo.com', // <- identifiant que tu vois dans le screenshot
        pass: 'sVwG40MSmjxTpbyH' // <- le mot de passe que tu as généré
    }
});
const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: '"TuniSavors" <tunisavors@gmail.com>',
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
