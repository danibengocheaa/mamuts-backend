"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routineController_1 = require("../controllers/routineController");
const routineDayController_js_1 = require("../controllers/routineDayController.js");
const activeRoutineController_js_1 = require("../controllers/activeRoutineController.js");
const router = (0, express_1.Router)();
// Rutas de rutinas
router.get("/getRoutines", routineController_1.getRoutines);
router.get("/user/:usuariId", routineController_1.getRoutinesByUser);
router.get("/predefined", routineController_1.getPredefinedRoutines);
router.get("/detail/:id", routineController_1.getRoutineWithDays);
router.get("/search", routineController_1.searchRoutines);
router.post("/create", routineController_1.createRoutine);
router.put("/update/:id", routineController_1.updateRoutine);
router.delete("/delete/:id", routineController_1.deleteRoutine);
router.post("/clone", routineController_1.cloneRoutine);
// Rutas de días de rutina
router.get("/days/:rutinaId", routineDayController_js_1.getRoutineDays);
router.post("/day/create", routineDayController_js_1.createRoutineDay);
router.put("/day/update/:id", routineDayController_js_1.updateRoutineDay);
router.delete("/day/delete/:id", routineDayController_js_1.deleteRoutineDay);
router.delete("/days/deleteAll/:rutinaId", routineDayController_js_1.deleteAllRoutineDays);
// Rutas de rutina activa
router.get("/active/:usuariId", activeRoutineController_js_1.getActiveRoutine);
router.post("/active/set", activeRoutineController_js_1.setActiveRoutine);
router.get("/active/calendar/:usuariId", activeRoutineController_js_1.getActiveRoutineCalendar);
router.delete("/active/remove/:usuariId", activeRoutineController_js_1.removeActiveRoutine);
exports.default = router;
//# sourceMappingURL=routineRoutes.js.map