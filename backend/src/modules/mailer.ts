import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
// auth: {
//   user: process.env.SMTP_USER,
//   pass: process.env.SMTP_PASSWORD,
// },

const transport = nodemailer.createTransport({
  host: `${process.env.SMTP_HOST}`,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transport;
