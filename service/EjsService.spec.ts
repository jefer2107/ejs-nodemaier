import { EjsService } from "./EjsService"

describe('EjsService', () => {
    it('should be error when pass incorrectly content', async () => {
        const content = undefined
        const ejsData = {
            name: 'Joca',
            title: 'Testando ejs'
        }

        try {
            await EjsService.compilerToHtml(content, ejsData)
            
        } catch (error) {
            expect(error).toMatch('the content cannot be null')
        }
        
    })

    it('should be returned HTML correctly', async () => {
        const ejsExpected = '<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Testando ejs</title> </head> <body> <h1>Hello, Joca! </h1> <p>Welcome to our website.</p> </body> </html>'
        const content = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title><%= title %></title> </head> <body> <h1>Hello, <%= name %>! </h1> <p>Welcome to our website.</p> </body> </html>'
        const ejsData = {
            name: 'Joca',
            title: 'Testando ejs'
        }

        const ejs = await EjsService.compilerToHtml(content, ejsData)

        expect(ejs).toEqual(ejsExpected)
    })
})