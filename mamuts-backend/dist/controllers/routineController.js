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
exports.cloneRoutine = exports.searchRoutines = exports.deleteRoutine = exports.updateRoutine = exports.createRoutine = exports.getRoutineWithDays = exports.getPredefinedRoutines = exports.getRoutinesByUser = exports.getRoutines = void 0;
const rutines_1 = __importDefault(require("../models/rutines"));
const rutinaDay_1 = __importDefault(require("../models/rutinaDay"));
const exercici_1 = __importDefault(require("../models/exercici"));
const activeRoutine_1 = __importDefault(require("../models/activeRoutine")); // Importar ActiveRoutine
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection")); // Asegúrate de importar tu instancia de sequelize
// Obtener todas las rutinas
const getRoutines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routines = yield rutines_1.default.findAll({
            order: [["rutina_id", "ASC"]],
        });
        res.json(routines);
    }
    catch (error) {
        console.error("Error fetching routines:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
});
exports.getRoutines = getRoutines;
// Obtener rutinas por usuario
const getRoutinesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuariId } = req.params;
    try {
        const routines = yield rutines_1.default.findAll({
            where: { usuari_id: usuariId },
            order: [["rutina_id", "ASC"]],
        });
        res.json(routines);
    }
    catch (error) {
        console.error("Error fetching user routines:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
});
exports.getRoutinesByUser = getRoutinesByUser;
// Obtener rutinas predefinidas
const getPredefinedRoutines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routines = yield rutines_1.default.findAll({
            where: { is_predefined: true },
            order: [["rutina_id", "ASC"]],
        });
        res.json(routines);
    }
    catch (error) {
        console.error("Error fetching predefined routines:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
});
exports.getPredefinedRoutines = getPredefinedRoutines;
// Obtener una rutina por ID con sus días y ejercicios
const getRoutineWithDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log(`Fetching routine details for routine ID: ${id}`);
        const routine = yield rutines_1.default.findByPk(id);
        if (!routine) {
            console.log(`No routine found with ID ${id}`);
            return res.status(404).json({
                msg: `No existe una rutina con el id ${id}`,
            });
        }
        console.log(`Routine found: ${routine.get("nom")}`);
        // Obtener los días de la rutina con sus ejercicios
        const routineDays = (yield rutinaDay_1.default.findAll({
            where: { rutina_id: id },
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
        console.log(`Found ${routineDays.length} routine days for routine ${id}`);
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
        const days = {};
        routineDaysWithVirtual.forEach((day) => {
            if (!days[day.day_name]) {
                days[day.day_name] = [];
            }
            days[day.day_name].push(day);
        });
        res.json({
            routine,
            days,
        });
    }
    catch (error) {
        console.error("Error fetching routine with days:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error.message,
        });
    }
});
exports.getRoutineWithDays = getRoutineWithDays;
// Crear una nueva rutina
const createRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating new routine with data:", req.body);
        // IMPORTANT: Remove rutina_id from the request body to let the database auto-increment it
        const _a = req.body, { rutina_id } = _a, routineData = __rest(_a, ["rutina_id"]);
        // Create the new routine without specifying the ID
        const newRoutine = yield rutines_1.default.create(routineData);
        console.log("New routine created successfully with ID:", newRoutine.get("rutina_id"));
        res.json(newRoutine);
    }
    catch (error) {
        console.error("Error creating routine:", error);
        res.status(500).json({
            msg: "Error creating routine. Please contact the administrator.",
            error: error.message,
        });
    }
});
exports.createRoutine = createRoutine;
// Actualizar una rutina existente
const updateRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const routine = yield rutines_1.default.findByPk(id);
        if (!routine) {
            return res.status(404).json({
                msg: `No existe una rutina con el id ${id}`,
            });
        }
        yield routine.update(body);
        res.json(routine);
    }
    catch (error) {
        console.error("Error actualizando rutina:", error);
        res.status(500).json({
            msg: "Habla con el administrador",
        });
    }
});
exports.updateRoutine = updateRoutine;
// Eliminar una rutina
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validar si el id está presente
    if (!id) {
        return res.status(400).json({
            msg: "ID no proporcionado en la solicitud",
        });
    }
    // Iniciar una transacción para asegurar la integridad de los datos
    const transaction = yield connection_1.default.transaction();
    try {
        // Verificar si la rutina existe antes de intentar eliminarla
        const routine = yield rutines_1.default.findByPk(id, { transaction });
        if (!routine) {
            yield transaction.rollback();
            return res.status(404).json({
                msg: `There is no routine with the id ${id}`,
            });
        }
        // Verificar si la rutina está activa para algún usuario
        const activeRoutines = yield activeRoutine_1.default.findAll({
            where: { rutina_id: id },
            transaction,
        });
        // Si la rutina está activa, primero eliminar esas referencias
        if (activeRoutines.length > 0) {
            console.log(`Routine ${id} is active for ${activeRoutines.length} users. Removing active references first.`);
            yield activeRoutine_1.default.destroy({
                where: { rutina_id: id },
                transaction,
            });
        }
        // Eliminar todos los días de la rutina
        yield rutinaDay_1.default.destroy({
            where: { rutina_id: id },
            transaction,
        });
        // Eliminar la rutina
        yield routine.destroy({ transaction });
        // Confirmar la transacción
        yield transaction.commit();
        // Responder con mensaje de éxito
        res.json({
            msg: `Routine with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        // Revertir la transacción en caso de error
        yield transaction.rollback();
        // Mostrar error en consola para depuración
        console.error("Error deleting routine:", error);
        // Responder con mensaje detallado del error
        res.status(500).json({
            msg: "Error al eliminar la rutina",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteRoutine = deleteRoutine;
// Buscar rutinas
const searchRoutines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const routines = yield rutines_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ nom: { [sequelize_1.Op.like]: `%${query}%` } }, { descripcio: { [sequelize_1.Op.like]: `%${query}%` } }],
            },
            order: [["rutina_id", "ASC"]],
        });
        res.json(routines);
    }
    catch (error) {
        console.error("Error searching routines:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
});
exports.searchRoutines = searchRoutines;
// Clonar una rutina predefinida para un usuario
const cloneRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rutinaId, usuariId } = req.body;
    try {
        // Obtener la rutina original
        const originalRoutine = (yield rutines_1.default.findByPk(rutinaId));
        if (!originalRoutine) {
            return res.status(404).json({
                msg: `No existe una rutina con el id ${rutinaId}`,
            });
        }
        // Crear una nueva rutina para el usuario
        const newRoutine = (yield rutines_1.default.create({
            usuari_id: usuariId,
            nom: `${originalRoutine.nom} (Copia)`,
            descripcio: originalRoutine.descripcio,
            is_predefined: false,
            image_url: originalRoutine.image_url,
            difficulty: originalRoutine.difficulty,
            duration_weeks: originalRoutine.duration_weeks,
        }));
        // Obtener los días de la rutina original
        const originalDays = (yield rutinaDay_1.default.findAll({
            where: { rutina_id: rutinaId },
        }));
        // Crear los días para la nueva rutina
        const newDays = yield Promise.all(originalDays.map((day) => rutinaDay_1.default.create({
            rutina_id: newRoutine.rutina_id,
            day_name: day.day_name,
            exercici_id: day.exercici_id,
            sets: day.sets,
            reps: day.reps,
            notes: day.notes,
        })));
        res.json({
            routine: newRoutine,
            days: newDays,
        });
    }
    catch (error) {
        console.error("Error cloning routine:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
        });
    }
});
exports.cloneRoutine = cloneRoutine;
//# sourceMappingURL=routineController.js.map