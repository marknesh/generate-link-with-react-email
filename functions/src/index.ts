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
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { initializeApp } from 'firebase-admin/app';
import { ActionCodeSettings, getAuth } from 'firebase-admin/auth';
import { FirebaseError } from '@firebase/util';

// import * as logger from 'firebase-functions/logger';

setGlobalOptions({ maxInstances: 10 });

initializeApp();

const auth = getAuth();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

exports.sendEmail = onRequest(
  async (req: functions.Request, res: functions.Response) => {
    try {
      const actionCodeSettings: ActionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        // Please remember to replace the URL with the appropriate value for production.
        url: process.env.NEXT_PUBLIC_MAGIC_LINK_URL as string,
        handleCodeInApp: true,
      };

      const magicLink = await auth.generateSignInWithEmailLink(
        'mikeknowles.dez@gmail.com',
        actionCodeSettings
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      // eslint-disable-next-line
      const emailHtml = render(Email({ magicLink }));

      const options = {
        from: `Dev <${process.env.FROM_EMAIL}>`,
        to: `${process.env.TO_EMAIL}`,
        subject: 'hello world',
        html: emailHtml,
      };

      transporter
        .sendMail(options)
        .then(() => res.send('success'))
        .catch((err) => res.send({ error: err || 'error occured' }));
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json(error || 'An error occured.');
      }
    }
  }
);
