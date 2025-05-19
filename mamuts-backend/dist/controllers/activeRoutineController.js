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
exports.removeActiveRoutine = exports.getActiveRoutineCalendar = exports.setActiveRoutine = exports.getActiveRoutine = void 0;
const activeRoutine_1 = __importDefault(require("../models/activeRoutine"));
const rutines_1 = __importDefault(require("../models/rutines"));
const rutinaDay_1 = __importDefault(require("../models/rutinaDay"));
const exercici_1 = __importDefault(require("../models/exercici"));
const connection_1 = __importDefault(require("../database/connection")); // Asegúrate de importar tu instancia de sequelize
// Obtener la rutina activa de un usuario
const getActiveRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuariId } = req.params;
    try {
        console.log(`Fetching active routine for user ${usuariId}`);
        const activeRoutine = (yield activeRoutine_1.default.findOne({
            where: { usuari_id: usuariId },
            include: [
                {
                    model: rutines_1.default,
                    attributes: ["rutina_id", "nom", "descripcio", "image_url", "difficulty", "duration_weeks"],
                },
            ],
        }));
        if (!activeRoutine) {
            console.log(`No active routine found for user ${usuariId}`);
            return res.status(404).json({
                msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
            });
        }
        console.log(`Active routine found for user ${usuariId}:`, activeRoutine.rutina_id);
        res.json(activeRoutine);
    }
    catch (error) {
        console.error("Error fetching active routine:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getActiveRoutine = getActiveRoutine;
// Establecer una rutina como activa para un usuario
const setActiveRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuariId, rutinaId } = req.body;
    // Iniciar una transacción
    const transaction = yield connection_1.default.transaction();
    try {
        // Verificar que la rutina existe
        const routine = yield rutines_1.default.findByPk(rutinaId, { transaction });
        if (!routine) {
            yield transaction.rollback();
            return res.status(404).json({
                msg: `No existe una rutina con el id ${rutinaId}`,
            });
        }
        // Verificar si el usuario ya tiene una rutina activa
        const existingActive = (yield activeRoutine_1.default.findOne({
            where: { usuari_id: usuariId },
            transaction,
        }));
        let result;
        if (existingActive) {
            // Actualizar la rutina activa existente
            result = yield existingActive.update({
                rutina_id: rutinaId,
                start_date: new Date(),
            }, { transaction });
        }
        else {
            // Crear una nueva rutina activa
            result = yield activeRoutine_1.default.create({
                usuari_id: usuariId,
                rutina_id: rutinaId,
                start_date: new Date(),
            }, { transaction });
        }
        // Confirmar la transacción
        yield transaction.commit();
        res.json(result);
    }
    catch (error) {
        // Revertir la transacción en caso de error
        yield transaction.rollback();
        console.error("Error setting active routine:", error);
        res.status(500).json({
            msg: "Error al establecer la rutina activa",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.setActiveRoutine = setActiveRoutine;
// Obtener el calendario de ejercicios de la rutina activa
const getActiveRoutineCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuariId } = req.params;
    try {
        console.log(`Fetching active routine calendar for user ${usuariId}`);
        // Obtener la rutina activa del usuario
        const activeRoutine = (yield activeRoutine_1.default.findOne({
            where: { usuari_id: usuariId },
            include: [
                {
                    model: rutines_1.default,
                    attributes: ["rutina_id", "nom", "descripcio"],
                },
            ],
        }));
        if (!activeRoutine) {
            console.log(`No active routine found for user ${usuariId}`);
            return res.status(404).json({
                msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
            });
        }
        console.log(`Active routine found for user ${usuariId}, routine ID: ${activeRoutine.rutina_id}`);
        // Obtener los días de la rutina activa
        const routineDays = (yield rutinaDay_1.default.findAll({
            where: { rutina_id: activeRoutine.rutina_id },
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
        }));
        console.log(`Found ${routineDays.length} routine days for routine ${activeRoutine.rutina_id}`);
        // Add virtual fields for compatibility with frontend
        const routineDaysWithVirtual = routineDays.map((day) => {
            const plainDay = day.get({ plain: true });
            if (plainDay.Exercici) {
                plainDay.Exercici.image_url = null;
                plainDay.Exercici.categoria = plainDay.Exercici.grupMuscular;
            }
            return plainDay;
        });
        // Agrupar los ejercicios por día
        const calendar = {};
        routineDaysWithVirtual.forEach((day) => {
            if (!calendar[day.day_name]) {
                calendar[day.day_name] = [];
            }
            calendar[day.day_name].push(day);
        });
        res.json({
            activeRoutine,
            calendar,
        });
    }
    catch (error) {
        console.error("Error fetching active routine calendar:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getActiveRoutineCalendar = getActiveRoutineCalendar;
// Eliminar la rutina activa de un usuario
const removeActiveRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuariId } = req.params;
    try {
        const activeRoutine = (yield activeRoutine_1.default.findOne({
            where: { usuari_id: usuariId },
        }));
        if (!activeRoutine) {
            return res.status(404).json({
                msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
            });
        }
        yield activeRoutine.destroy();
        res.json({
            msg: `Rutina activa eliminada correctamente para el usuario con id ${usuariId}`,
        });
    }
    catch (error) {
        console.error("Error removing active routine:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.removeActiveRoutine = removeActiveRoutine;
//# sourceMappingURL=activeRoutineController.js.map