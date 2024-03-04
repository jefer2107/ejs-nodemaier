"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjsNodemailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ImageService_1 = require("./ImageService");
const EjsService_1 = require("./EjsService");
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
        try {
            let newMailData;
            const { type, content, attachments, text, alternatives, ejsData } = mailData.body;
            const { body, ...maildataContent } = mailData;
            if (!options.host ||
                !options.port ||
                options.secure === null ||
                !options.user ||
                !options.password)
                throw new Error('Missing required fields in options');
            if (!mailData?.from || !mailData?.to)
                throw new Error('From and To are required');
            ImageService_1.ImageService.validateSizeLimit(attachments);
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
                            attachments,
                            alternatives
                        };
                        break;
                    case 'ejs':
                        const ejs = await EjsService_1.EjsService.compilerToHtml(content, ejsData);
                        newMailData = {
                            ...maildataContent,
                            text,
                            html: ejs,
                            attachments,
                            alternatives
                        };
                        break;
                    default:
                        newMailData = {
                            ...maildataContent,
                            text
                        };
                }
            }
            await transporter.sendMail(newMailData);
            return 'Email successfully sent!';
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.EjsNodemailer = EjsNodemailer;
//# sourceMappingURL=EjsNodemailer.js.map