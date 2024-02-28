"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjsNodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EjsNodemailer {
    static createTransport(options) {
        try {
            const transporter = nodemailer_1.default.createTransport(options);
            return transporter;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async sendMail(options, mailData) {
        let newMailData;
        const { type, content, images, text } = mailData.body;
        const { body, ...maildataContent } = mailData;
        const smtp = {
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.user,
                pass: options.password
            }
        };
        const transporter = this.createTransport(smtp);
        if (transporter) {
            switch (type) {
                case 'html':
                    newMailData = {
                        ...maildataContent,
                        text,
                        html: content,
                        images
                    };
                case 'ejs':
                    newMailData = {
                        ...maildataContent,
                        text,
                        html: content,
                        images
                    };
                default:
                    newMailData = {
                        ...maildataContent,
                        text
                    };
            }
        }
        try {
            await transporter.sendMail(newMailData);
            return 'Email successfully sent!';
        }
        catch (error) {
            throw new Error(`Error sending the e-mail:${error}`);
        }
    }
}
exports.EjsNodemailer = EjsNodemailer;
//# sourceMappingURL=EjsNodemailer.js.map