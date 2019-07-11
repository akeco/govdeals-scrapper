const nodemailer = require("nodemailer");
const emailTemplate = require('../utils/emailTemplate');

const sendEmail = async (items) => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Updated items',
        html: emailTemplate(items)
    };

    try {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch(e) {
        console.log("ER", e);
    }
};

module.exports = sendEmail;
