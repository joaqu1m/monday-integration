const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASS } = process.env

const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});

const enviarEmail = (email) => {
    transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "MANUALL: Você recebeu uma mensagem!",
        text: "Nosso assistente virtual Manuel te enviou uma mensagem",
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email enviado: " + info.response);
        }
    })
}

module.exports = {
    enviarEmail
}
