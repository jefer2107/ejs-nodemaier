import { ImageService } from "./ImageService"

describe('ImageService', () => {
    it('should be return an error when passing the image with a size above 1 mega', () => {
        const attachments = [
            {
                filename: 'imageTestSize7mega.jpg',
                path:'images/imageTestSize7mega.jpg',
                cid: 'imageTest'
            },
        ]

        try {
            ImageService.validateSizeLimit(attachments)
            
        } catch (error:any) {
            expect(error.message)
            .toBe('The filePath:images/imageTestSize7mega.jpg exceeds the allowed size.')
        }
    })
})