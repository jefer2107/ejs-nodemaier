"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MailService_1 = require("./service/MailService");
const options = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    password: "wmdr rdew kzve ylyf",
    user: "jefer210784@gmail.com"
};
const mailData = {
    from: 'jefer210784@gmail.com',
    to: "jefer.ld@hotmail.com",
    subject: "Hello ✔",
    body: {
        type: "text",
        content: "Testando",
        images: []
    }
};
MailService_1.MailService.sendMail(options, mailData)
    .then(x => console.log('result', x))
    .catch(error => console.log('error', error));
//# sourceMappingURL=index.js.map