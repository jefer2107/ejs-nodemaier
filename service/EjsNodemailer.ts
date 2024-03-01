import { MailData, OptionsSendMailConfig, OptionsTransportConfig } from "../types";
import nodemailer from 'nodemailer';
import { ImageService } from "./ImageService";

export abstract class EjsNodemailer{

    private static createTransport(options: OptionsTransportConfig): any {
        
        try {
            const transporter = nodemailer.createTransport(options);
            return transporter

        } catch (error:any) {
            throw new Error(error);
        }
    }

    static async sendMail(options: OptionsSendMailConfig, mailData: MailData): Promise<string> {
        try {
            let newMailData;
            const { type, content, attachments , text, alternatives } = mailData.body
            const { body, ...maildataContent } = mailData

            await ImageService.validateSizeLimit(attachments)

            const smtp = {
                host: options.host,
                port: options.port,
                secure: options.secure,
                auth: {
                    user: options.user,
                    pass: options.password
                }
            }

            const transporter:any = this.createTransport(smtp);

            if(transporter){
                switch(type){
                    case 'html':
                        
                        newMailData = {
                            ...maildataContent,
                            text,
                            html: content,
                            attachments,
                            alternatives
                        }
                        break

                    case 'ejs':
                        newMailData = {
                            ...maildataContent,
                            text,
                            html: content,
                            attachments,
                            alternatives
                        }
                        break

                    default:
                        newMailData = {
                            ...maildataContent,
                            text
                        }
                }
            }

            await transporter.sendMail(newMailData)
            return 'Email successfully sent!'
            
        } catch (error:any) {
            throw new Error(`Error sending the e-mail:${error}`)
        }
    }
}