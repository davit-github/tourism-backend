import nodemailer from 'nodemailer';

export const sendEmail = (to) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'gyumriforall@mail.ru',
      pass: 'SxCrRiePnBgo3ksMbfcq',
    },
  });

  const mailOptions = {
    from: '"Gyumri For All" <gyumriforall@mail.ru>',
    to,
    subject: 'Admin-Reminder',
    html: 'Բարև, ըսիգ Gyumri For All վեբ կայքն է, արի իրար հեդ բացահայդենք Գյումրին',
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
