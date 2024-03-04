jest.mock('nodemailer')

import nodemailer from 'nodemailer'
import { MailData, OptionsSendMailConfig } from '../types';
import { EjsNodemailer } from './EjsNodemailer';

describe('EjsNodemailer', () => {
    let mockTransporter:any;

    beforeEach(() => {
        mockTransporter = {
            sendMail: jest.fn().mockReturnValueOnce('Email successfully sent!')
        }
    })

    describe('sendMail', () => {
        it('should be returned error when passing null data options', async () => {
            (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter)

            const options:any = {
                host: "smtp.test.com",
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            }

            const mailData:MailData = {
                from: 'test@gmail.com',
                to: "fulano@hotmail.com",
                subject: "Hello ✔",
                body: {
                    type:"text",
                    text:"Testando HTML ffff"
                }
            }

            try {
                await EjsNodemailer.sendMail(options, mailData)

            } catch (error:any) {
                expect(error.message).toBe('Error: Missing required fields in options')
            }


        })

        it('should be returned error when passing null data mailData', async () => {
            (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter)

            const options:OptionsSendMailConfig = {
                host: "smtp.test.com",
                port: 222,
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            }

            const mailData:any = {
                from: 'test@gmail.com',
                to: "",
                subject: "Hello ✔",
                body: {
                    type:"text",
                    text:"Testando HTML ffff"
                }
            }

            try {
                await EjsNodemailer.sendMail(options, mailData)
                
            } catch (error:any) {
                expect(error.message).toBe('Error: From and To are required')
            }
        })

        it('should be called with arg correctly', async () => {
            (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter)

            const options:OptionsSendMailConfig = {
                host: "smtp.test.com",
                port: 222,
                secure: false,
                password: "12344321",
                user: "test@gmail.com"
            }

            const mailData:MailData = {
                from: 'test@gmail.com',
                to: "fulano@hotmail.com",
                subject: "Hello ✔",
                body: {
                    type:"text",
                    text:"Testando HTML ffff"
                }
            }

            const argOptions = { ...options, auth: { pass: options.password, user: options.user} }
            const { password, user, ...newOptions } = argOptions

            const newMaildata = {...mailData, text: mailData.body.text}
            const { body, ...maildataArg } = newMaildata

            await EjsNodemailer.sendMail(options, mailData)

            expect(nodemailer.createTransport).toHaveBeenCalledWith(newOptions)
            expect(mockTransporter.sendMail).toHaveBeenCalledWith(expect.objectContaining(maildataArg))
        })
    })
})