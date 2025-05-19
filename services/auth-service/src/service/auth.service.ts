import crypto from 'crypto';
import { User } from '../models/User';
import { sendEmail } from '../utils/linkMailer';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';


const JWT_SECRET = process.env.JWT_SECRET || '10maav2699';

export const sendMagicLink = async (email: string) => {
  // 1. Vérifier si l'utilisateur existe
  let user = await User.findOne({ email });
  
  // 2. Créer un nouveau user si nécessaire
  if (!user) {
    user = new User({ email });
  }

  // 3. Générer un token temporaire (valide 15min)
  const token = crypto.randomBytes(32).toString('hex');
  user.verifToken = token;
  user.verifTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15min
  await user.save();

  // 4. Envoyer le lien par email
  const magicLink = `http://localhost:3001/api/auth/verify?token=${token}&email=${email}`;
  await sendEmail({
    to: email,
    subject: 'Connexion à TuniSavors',
    html: `Cliquez <a href="${magicLink}">ici</a> pour vous connecter. Lien valide 15 minutes.`
  });

  return { message: 'Magic Link envoyé par email' };
};

export const verifyMagicLink = async (token: string, email: string) => {
  const user = await User.findOne({ email, verifToken: token });
  
  // Vérifier le token et son expiration
  if (!user || !user.verifTokenExpires || user.verifTokenExpires < new Date()) {
    throw new Error('Lien invalide ou expiré');
  }

  // Générer un JWT pour la session
  const accessToken = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '7d' }
  );

  // Mettre à jour l'utilisateur
  user.accessToken = accessToken;
  user.isVerified = true;
  user.lastLogin = new Date();
  user.verifToken = undefined;
  user.verifTokenExpires = undefined;
  await user.save();

  return { accessToken, user };
};


/// Register

export const registerUserWithMagicLink = async (email: string) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('Utilisateur déjà existant');
  }

  const user = new User({ email });

  const token = crypto.randomBytes(32).toString('hex');
  user.verifToken = token;
  user.verifTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  // const magicLink = `http://localhost:3001/api/auth/verify?token=${token}&email=${email}`;

// const appBaseUrl = "http://localhost:3001"; // À adapter pour prod
// const logoUrl = `${appBaseUrl}/static/images/logo.png`; // ✅ URL d'accès local

// const magicLink = `${appBaseUrl}/api/auth/verify?token=${token}&email=${email}`;

// const emailHtml = `
//   <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
//     <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//       <div style="text-align: center; padding: 30px 20px 10px;">
//         <img src="${logoUrl}" alt="TuniSavors" style="max-width: 150px; margin-bottom: 20px;" />
//         <h1 style="color: #A12312;">Bienvenue sur TuniSavors 🇹🇳</h1>
//         <p style="color: #333; font-size: 16px;">
//           Merci de vous être inscrit ! Cliquez sur le bouton ci-dessous pour finaliser votre inscription et commencer votre voyage culinaire.
//         </p>
//         <a href="${magicLink}" style="
//           display: inline-block;
//           margin-top: 20px;
//           padding: 14px 28px;
//           background-color: #A12312;
//           color: #fff;
//           font-weight: bold;
//           text-decoration: none;
//           border-radius: 8px;
//         ">
//           ✅ Valider mon inscription
//         </a>
//       </div>
//       <div style="padding: 20px; color: #888; font-size: 14px; text-align: center;">
//         Ce lien expirera dans 15 minutes. Si vous n’avez pas demandé cette inscription, vous pouvez ignorer cet email.
//         <br /><br />
//         © ${new Date().getFullYear()} TuniSavors. Tous droits réservés.
//       </div>
//     </div>
//   </div>
// `;

// await sendEmail({
//   to: email,
//   subject: 'Inscription à TuniSavors',
//   html: emailHtml, // ✅ nouvelle version stylisée
// });
  const appBaseUrl = "http://localhost:3001"; // À adapter pour prod

const logoPath = path.join(__dirname, '../../public/images/logo.png'); // Chemin relatif ajusté
  const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
  const logoUrl = `data:image/png;base64,${logoBase64}`;

  const magicLink = `${appBaseUrl}/api/auth/verify?token=${token}&email=${email}`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding: 30px 20px 10px;">
          <img src="${logoUrl}" alt="TuniSavors" style="max-width: 150px; margin-bottom: 20px;" />
          <h1 style="color: #A12312;">Bienvenue sur TuniSavors 🇹🇳</h1>
          <p style="color: #333; font-size: 16px;">
            Merci de vous être inscrit ! Cliquez sur le bouton ci-dessous pour finaliser votre inscription et commencer votre voyage culinaire.
          </p>
          <a href="${magicLink}" style="
            display: inline-block;
            margin-top: 20px;
            padding: 14px 28px;
            background-color: #A12312;
            color: #fff;
            font-weight: bold;
            text-decoration: none;
            border-radius: 8px;
          ">
            ✅ Valider mon inscription
          </a>
        </div>
        <div style="padding: 20px; color: #888; font-size: 14px; text-align: center;">
          Ce lien expirera dans 15 minutes. Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email.
          <br /><br />
          © ${new Date().getFullYear()} TuniSavors. Tous droits réservés.
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Inscription à TuniSavors',
    html: emailHtml,
  });

  return { message: 'Lien d’inscription envoyé par email' };
};

export const loginUserWithMagicLink = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.verifToken = token;
  user.verifTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const magicLink = `http://localhost:3001/api/auth/verify?token=${token}&email=${email}`;
  await sendEmail({
    to: email,
    subject: 'Connexion à TuniSavors',
    html: `Cliquez <a href="${magicLink}">ici</a> pour vous connecter. Lien valide 15 minutes.`
  });

  return { message: 'Magic Link de connexion envoyé par email' };
};


