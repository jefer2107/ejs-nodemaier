"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageService_1 = require("./ImageService");
describe('ImageService', () => {
    it('should be return an error when passing the image with a size above 1 mega', () => {
        const attachments = [
            {
                filename: 'imageTestSize7mega.jpg',
                path: 'images/imageTestSize7mega.jpg',
                cid: 'imageTest'
            },
        ];
        try {
            ImageService_1.ImageService.validateSizeLimit(attachments);
        }
        catch (error) {
            console.log(error);
            expect(error)
                .toBe('The filePath:images/imageTestSize7mega.jpg exceeds the allowed size.');
        }
    });
});
//# sourceMappingURL=ImageService.spec.js.map