"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjsService = void 0;
const ejs_1 = __importDefault(require("ejs"));
class EjsService {
    static async compilerForHtml(ejsContent, data) {
        return new Promise((res, rej) => {
            if (!ejsContent)
                return rej('ejsTemplate not exists.');
            let template = ejs_1.default.compile(ejsContent);
            const html = template(data);
            return res(html);
        });
    }
}
exports.EjsService = EjsService;
//# sourceMappingURL=EjsService.js.map