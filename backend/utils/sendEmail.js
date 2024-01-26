const nodeMailer = require("nodemailer"); //userController ma forget password ma use kiya

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST, //agr gmail issue kr rahi h then ya pr nichy wala add kiya h(host,port)
    port: process.env.SMPT_PORT,
    secure: true,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },

    // service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};
module.exports = sendEmail;
//Mail wali 3:11:55 backend
//9:30 frontend
