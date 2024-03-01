import ejs from 'ejs'

export abstract class EjsService{

    static async compilerToHtml(ejsContent:string | undefined, data:any): Promise<string>{
        return new Promise((res,rej)=>{
            if(!ejsContent) return rej('ejsTemplate not exists.') 
    
            let template = ejs.compile(ejsContent)
            const html = template(data)
            return res(html)  
        })
    }
}