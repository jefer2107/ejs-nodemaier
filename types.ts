export interface Auth{
    user: string;
    pass: string;
}

export interface OptionsTransportConfig{
    host: string;
    port: number;
    secure: boolean;
    auth: Auth;
}

export interface OptionsSendMailConfig{
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
}

export interface Attachment{
    filename?: string;
    path?: string;
    buffer?: string;
    cid?: string;
    content?: any;
    encoding?: string;
    raw?: string;
    contentType?: string;
}

interface Alternative{
    contentType: string;
    content: string;
}

interface MailDataBody{
    type: 'html' | 'text' | 'ejs';
    text?: string;
    content?: string;
    ejsData?: any;
    attachments?: Attachment[];
    alternatives?: Alternative[];
}

export interface MailData{
    from: string;
    to: string;
    subject?: string;
    body: MailDataBody;
}

export interface BodyBufferContentImage{
    fileName: string;
    buffer: string;
}

export interface BodyFilePathContentImage{
    fileName: string;
    filePath: string;
    cid?: string;
}
