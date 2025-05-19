"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const exerciciRoutes_1 = __importDefault(require("./routes/exerciciRoutes"));
const routineRoutes_1 = __importDefault(require("./routes/routineRoutes"));
const dietaRoutes_1 = __importDefault(require("./routes/dietaRoutes"));
const progressPhotoRoutes_1 = __importDefault(require("./routes/progressPhotoRoutes"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./database/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            user: "/user",
            exercici: "/exercici",
            routine: "/rutina",
            dieta: "/dieta",
            progressPhoto: "/progress",
        };
        this.app = (0, express_1.default)();
        this.port = "8000";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database online");
                yield connection_1.default.sync({ force: false });
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)({
            origin: true, // o especifica tu dominio frontend
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        //Lectura del body
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.user, userRoutes_1.default);
        this.app.use(this.apiPaths.exercici, exerciciRoutes_1.default);
        this.app.use(this.apiPaths.routine, routineRoutes_1.default);
        this.app.use(this.apiPaths.dieta, dietaRoutes_1.default);
        this.app.use(this.apiPaths.progressPhoto, progressPhotoRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running  on port " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map