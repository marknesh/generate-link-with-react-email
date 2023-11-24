/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { Email } from '../dist/email.js';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

exports.sendEmail = onRequest(
  (req: functions.Request, res: functions.Response) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const emailHtml = render(Email({ url: 'https://example.com' }));

    const options = {
      from: `Dev <${process.env.FROM_EMAIL}>`,
      to: `${process.env.TO_EMAIL}`,
      subject: 'hello world',
      html: emailHtml,
    };

    transporter
      .sendMail(options)
      .then((r) => res.send('success'))
      .catch((err) => res.send({ error: err || 'error occured' }));
  }
);
