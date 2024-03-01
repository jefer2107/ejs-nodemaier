import ejs from 'ejs'

export abstract class EjsService{

    static async compilerForHtml(ejsContent:string, data:any): Promise<string>{
        return new Promise((res,rej)=>{
            if(!ejsContent) return rej('ejsTemplate not exists.') 
    
            let template = ejs.compile(ejsContent)
            const html = template(data)
            return res(html)  
        })
    }
}