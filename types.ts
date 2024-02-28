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

export interface MailData{
    from: string;
    to: string;
    subject?: string;
    body: any;
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
