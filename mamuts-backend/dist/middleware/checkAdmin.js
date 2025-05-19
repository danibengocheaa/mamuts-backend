"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = checkAdmin;
function checkAdmin(req, res, next) {
    const user = req.session.user;
    if ((user === null || user === void 0 ? void 0 : user.role) === 'Administrador') {
        next();
    }
    else {
        res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
    }
}
//# sourceMappingURL=checkAdmin.js.map