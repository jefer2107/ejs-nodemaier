import { Attachment } from "../types";
import fs from 'fs'
import pathNode from 'path'

export abstract class ImageService{

    private static async bufferBuild(filePath:string): Promise<any>{
        return new Promise((res,rej)=>{
            fs.readFile(pathNode.join(filePath),(erro,buffer)=>{
                if(erro){
                    return rej(erro)
                    
                }else{
                    return res(buffer)
                }
                
            })
        })

    }
    
    static async ensureImageIsBuffer(images:Attachment[]): Promise<Attachment[] | undefined>{
        try {
            let newImages:Attachment[] = [];
            for(let image of images){
                const { content, path } = image

                if(typeof path === 'string'){
                    const resultBuffer = await this.bufferBuild(path)
                    newImages.push({...image, path: resultBuffer})

                }else if(Buffer.isBuffer(content)){
                    newImages.push(image)
                    
                }else{
                    throw new Error('Formato inválido')
                }

                return newImages
            }
            
        } catch (error) {
            throw new Error(`Erro ao buildar a imagem:${error}`)
        }
    }

    static validateSizeLimit(images:Attachment[] | undefined): void{

        (images || []).forEach((image:any) => {
            const { path, content } = image

            if(Buffer.isBuffer(content) && content.toString().length >= 2000000){
                throw new Error('The file buffer exceeds the allowed size.')

            }else if(pathNode.extname(path) === '.pdf'){
                if(fs.statSync(path)['size'] >= 1000000)
                throw new Error(`The filePath:"${path}" exceeds the allowed size.`)

            }else{
                if(fs.statSync(path)['size'] >= 1000000)
                throw new Error(`The filePath:"${path}" exceeds the allowed size.`)
            }
                
        })

    }
}