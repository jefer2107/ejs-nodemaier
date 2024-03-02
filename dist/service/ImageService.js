"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BusinessError_1 = require("../BusinessError");
class ImageService {
    static async bufferBuild(filePath) {
        return new Promise((res, rej) => {
            fs_1.default.readFile(path_1.default.join(filePath), (erro, buffer) => {
                if (erro) {
                    return rej(erro);
                }
                else {
                    return res(buffer);
                }
            });
        });
    }
    static async ensureImageIsBuffer(images) {
        try {
            let newImages = [];
            for (let image of images) {
                const { content, path } = image;
                if (typeof path === 'string') {
                    const resultBuffer = await this.bufferBuild(path);
                    newImages.push({ ...image, path: resultBuffer });
                }
                else if (Buffer.isBuffer(content)) {
                    newImages.push(image);
                }
                else {
                    throw new BusinessError_1.BusinessError('Formato inválido');
                }
                return newImages;
            }
        }
        catch (error) {
            throw new Error(`Erro ao buildar a imagem:${error}`);
        }
    }
    static validateSizeLimit(images) {
        (images || []).forEach((image) => {
            const { path, content } = image;
            if (Buffer.isBuffer(content) && content.toString().length >= 2000000) {
                throw new BusinessError_1.BusinessError('The file buffer exceeds the allowed size.');
            }
            else if (path_1.default.extname(path) === '.pdf') {
                if (fs_1.default.statSync(path)['size'] >= 1000000)
                    throw new BusinessError_1.BusinessError(`The filePath:${path} exceeds the allowed size.`);
            }
            else {
                if (fs_1.default.statSync(path)['size'] >= 1000000)
                    throw new BusinessError_1.BusinessError(`The filePath:${path} exceeds the allowed size.`);
            }
        });
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map