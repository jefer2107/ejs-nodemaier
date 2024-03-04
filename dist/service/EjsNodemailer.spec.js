"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('nodemailer');
const nodemailer_1 = __importDefault(require("nodemailer"));
const EjsNodemailer_1 = require("./EjsNodemailer");
describe('EjsNodemailer', () => {
    let mockTransporter;
    beforeEach(() => {
        mockTransporter = {
            sendMail: jest.fn().mockReturnValueOnce('Email successfully sent!')
        };
    });
    describe('sendMail', () => {
        it('should be returned error when passing null data options', async () => {
            nodemailer_1.default.createTransport.mockReturnValue(mockTransporter);
            const options = {
                host: "smtp.test.com",
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            };
            const mailData = {
                from: 'test@gmail.com',
                to: "fulano@hotmail.com",
                subject: "Hello ✔",
                body: {
                    type: "text",
                    text: "Testando HTML ffff"
                }
            };
            try {
                await EjsNodemailer_1.EjsNodemailer.sendMail(options, mailData);
            }
            catch (error) {
                expect(error.message).toBe('Error: Missing required fields in options');
            }
        });
        it('should be returned error when passing null data mailData', async () => {
            nodemailer_1.default.createTransport.mockReturnValue(mockTransporter);
            const options = {
                host: "smtp.test.com",
                port: 222,
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            };
            const mailData = {
                from: 'test@gmail.com',
                to: "",
                subject: "Hello ✔",
                body: {
                    type: "text",
                    text: "Testando HTML ffff"
                }
            };
            try {
                await EjsNodemailer_1.EjsNodemailer.sendMail(options, mailData);
            }
            catch (error) {
                expect(error.message).toBe('Error: From and To are required');
            }
        });
        it('should be called with arg correctly', async () => {
            nodemailer_1.default.createTransport.mockReturnValue(mockTransporter);
            const options = {
                host: "smtp.test.com",
                port: 222,
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            };
            const mailData = {
                from: 'test@gmail.com',
                to: "fulano@hotmail.com",
                subject: "Hello ✔",
                body: {
                    type: "text",
                    text: "Testando HTML ffff"
                }
            };
            const argOptions = { ...options, auth: { pass: options.password, user: options.user } };
            const { password, user, ...newOptions } = argOptions;
            const newMaildata = { ...mailData, text: mailData.body.text };
            const { body, ...maildataArg } = newMaildata;
            await EjsNodemailer_1.EjsNodemailer.sendMail(options, mailData);
            expect(nodemailer_1.default.createTransport).toHaveBeenCalledWith(newOptions);
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(expect.objectContaining(maildataArg));
        });
    });
});
//# sourceMappingURL=EjsNodemailer.spec.js.map