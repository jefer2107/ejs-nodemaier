"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
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
        try {
            await transporter.sendMail(mailData);
            return 'Email successfully sent!';
        }
        catch (error) {
            throw new Error(`Error sending the e-mail:${error}`);
        }
    }
}
exports.MailService = MailService;
//# sourceMappingURL=MailService.js.map