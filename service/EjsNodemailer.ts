import { MailData, OptionsSendMailConfig, OptionsTransportConfig } from "../types";
import nodemailer from 'nodemailer';
import { ImageService } from "./ImageService";
import { EjsService } from "./EjsService";

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
            const { type, content, attachments , text, alternatives, ejsData } = mailData.body
            const { body, ...maildataContent } = mailData

            if(
                !options.host || 
                !options.port || 
                options.secure === null || 
                !options.user || 
                !options.password
                
            )  throw new Error('Missing required fields in options')

            if(!mailData?.from || !mailData?.to)
                throw new Error('From and To are required')

            ImageService.validateSizeLimit(attachments)

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
                        const ejs = await EjsService.compilerToHtml(content, ejsData)

                        newMailData = {
                            ...maildataContent,
                            text,
                            html: ejs,
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
            throw new Error(error)
        }
    }
}