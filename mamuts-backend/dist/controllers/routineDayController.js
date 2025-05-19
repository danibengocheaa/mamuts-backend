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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllRoutineDays = exports.deleteRoutineDay = exports.updateRoutineDay = exports.createRoutineDay = exports.getRoutineDays = void 0;
const rutinaDay_1 = __importDefault(require("../models/rutinaDay"));
const exercici_1 = __importDefault(require("../models/exercici")); // Asegúrate de que este modelo exista
// Obtener todos los días de una rutina
const getRoutineDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rutinaId } = req.params;
    try {
        console.log(`Fetching routine days for routine ID: ${rutinaId}`);
        const routineDays = yield rutinaDay_1.default.findAll({
            where: { rutina_id: rutinaId },
            include: [
                {
                    model: exercici_1.default,
                    attributes: ["exercici_id", "nom", "descripcio", "grupMuscular", "dificultat"],
                },
            ],
            order: [
                ["day_name", "ASC"],
                ["rutina_day_id", "ASC"],
            ],
        });
        // Add virtual fields for compatibility with frontend
        const routineDaysWithVirtual = routineDays.map((day) => {
            const plainDay = day.get({ plain: true });
            if (plainDay.Exercici) {
                plainDay.Exercici.image_url = null;
                plainDay.Exercici.categoria = plainDay.Exercici.grupMuscular;
            }
            return plainDay;
        });
        console.log(`Found ${routineDays.length} routine days for routine ${rutinaId}`);
        res.json(routineDaysWithVirtual);
    }
    catch (error) {
        console.error("Error fetching routine days:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getRoutineDays = getRoutineDays;
// Crear un nuevo día de rutina
const createRoutineDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating new routine day with data:", req.body);
        // IMPORTANT: Remove rutina_day_id from the request body to let the database auto-increment it
        const _a = req.body, { rutina_day_id } = _a, dayData = __rest(_a, ["rutina_day_id"]);
        // Create the new routine day without specifying the ID
        const newRoutineDay = yield rutinaDay_1.default.create(dayData);
        console.log("New routine day created successfully with ID:", newRoutineDay.get("rutina_day_id"));
        res.json(newRoutineDay);
    }
    catch (error) {
        console.error("Error creating routine day:", error);
        res.status(500).json({
            msg: "Error creating routine day. Please contact the administrator.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createRoutineDay = createRoutineDay;
// Actualizar un día de rutina
const updateRoutineDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        console.log(`Updating routine day with ID: ${id}`);
        const routineDay = yield rutinaDay_1.default.findByPk(id);
        if (!routineDay) {
            console.log(`No routine day found with ID ${id}`);
            return res.status(404).json({
                msg: `No existe un día de rutina con el id ${id}`,
            });
        }
        // Remove rutina_day_id from the update data if present
        const { rutina_day_id } = body, updateData = __rest(body, ["rutina_day_id"]);
        yield routineDay.update(updateData);
        console.log(`Routine day ${id} updated successfully`);
        res.json(routineDay);
    }
    catch (error) {
        console.error("Error updating routine day:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateRoutineDay = updateRoutineDay;
// Eliminar un día de rutina
const deleteRoutineDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log(`Deleting routine day with ID: ${id}`);
        const routineDay = yield rutinaDay_1.default.findByPk(id);
        if (!routineDay) {
            console.log(`No routine day found with ID ${id}`);
            return res.status(404).json({
                msg: `No existe un día de rutina con el id ${id}`,
            });
        }
        yield routineDay.destroy();
        console.log(`Routine day ${id} deleted successfully`);
        res.json({
            msg: `Día de rutina con id ${id} eliminado correctamente`,
        });
    }
    catch (error) {
        console.error("Error deleting routine day:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteRoutineDay = deleteRoutineDay;
// Eliminar todos los días de una rutina
const deleteAllRoutineDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rutinaId } = req.params;
    try {
        console.log(`Deleting all routine days for routine ID: ${rutinaId}`);
        const result = yield rutinaDay_1.default.destroy({
            where: { rutina_id: rutinaId },
        });
        console.log(`Deleted ${result} routine days for routine ${rutinaId}`);
        res.json({
            msg: `Todos los días de la rutina con id ${rutinaId} eliminados correctamente`,
            count: result,
        });
    }
    catch (error) {
        console.error("Error deleting routine days:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteAllRoutineDays = deleteAllRoutineDays;
//# sourceMappingURL=routineDayController.js.map