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
exports.getExercici = exports.deleteExercise = exports.updateExercise = exports.createExercise = exports.getExerciseById = exports.getExercises = void 0;
const exercici_1 = __importDefault(require("../models/exercici"));
// Get all exercises
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching all exercises");
        const exercises = yield exercici_1.default.findAll({
            order: [["nom", "ASC"]],
        });
        // Add virtual fields for compatibility with frontend
        const exercisesWithVirtual = exercises.map((ex) => {
            const plainEx = ex.get({ plain: true });
            plainEx.image_url = null;
            plainEx.categoria = plainEx.grupMuscular;
            return plainEx;
        });
        console.log(`Found ${exercises.length} exercises`);
        res.json(exercisesWithVirtual);
    }
    catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getExercises = getExercises;
// Get exercise by ID
const getExerciseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const exercise = (yield exercici_1.default.findByPk(id));
        if (!exercise) {
            return res.status(404).json({
                msg: `No exercise found with id ${id}`,
            });
        }
        // Add virtual fields for compatibility with frontend
        const plainExercise = exercise.get({ plain: true });
        plainExercise.image_url = null;
        plainExercise.categoria = plainExercise.grupMuscular;
        res.json(plainExercise);
    }
    catch (error) {
        console.error("Error fetching exercise:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getExerciseById = getExerciseById;
// Create a new exercise
const createExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newExercise = (yield exercici_1.default.create(body));
        // Add virtual fields for compatibility with frontend
        const plainExercise = newExercise.get({ plain: true });
        plainExercise.image_url = null;
        plainExercise.categoria = plainExercise.grupMuscular;
        res.status(201).json(plainExercise);
    }
    catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createExercise = createExercise;
// Update an exercise
const updateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const exercise = (yield exercici_1.default.findByPk(id));
        if (!exercise) {
            return res.status(404).json({
                msg: `No exercise found with id ${id}`,
            });
        }
        yield exercise.update(body);
        // Add virtual fields for compatibility with frontend
        const plainExercise = exercise.get({ plain: true });
        plainExercise.image_url = null;
        plainExercise.categoria = plainExercise.grupMuscular;
        res.json(plainExercise);
    }
    catch (error) {
        console.error("Error updating exercise:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateExercise = updateExercise;
// Delete an exercise
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const exercise = (yield exercici_1.default.findByPk(id));
        if (!exercise) {
            return res.status(404).json({
                msg: `No exercise found with id ${id}`,
            });
        }
        yield exercise.destroy();
        res.json({
            msg: `Exercise with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteExercise = deleteExercise;
// Add this new endpoint to match what the client is calling
const getExercici = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching all exercises via getExercici endpoint");
        // Reuse the existing getExercises function
        return (0, exports.getExercises)(req, res);
    }
    catch (error) {
        console.error("Error in getExercici:", error);
        res.status(500).json({
            msg: "Talk to the administrator",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getExercici = getExercici;
//# sourceMappingURL=exerciciController.js.map