import { Router } from "express"
import {
  createRoutine,
  deleteRoutine,
  getRoutines,
  updateRoutine,
  getRoutinesByUser,
  getPredefinedRoutines,
  getRoutineWithDays,
  searchRoutines,
  cloneRoutine,
} from "../controllers/routineController"

import {
  createRoutineDay,
  deleteRoutineDay,
  getRoutineDays,
  updateRoutineDay,
  deleteAllRoutineDays,
} from "../controllers/routineDayController.js"

import {
  getActiveRoutine,
  setActiveRoutine,
  getActiveRoutineCalendar,
  removeActiveRoutine,
} from "../controllers/activeRoutineController.js"

const router = Router()

// Rutas de rutinas
router.get("/getRoutines", getRoutines)
router.get("/user/:usuariId", getRoutinesByUser)
router.get("/predefined", getPredefinedRoutines)
router.get("/detail/:id", getRoutineWithDays)
router.get("/search", searchRoutines)
router.post("/create", createRoutine)
router.put("/update/:id", updateRoutine)
router.delete("/delete/:id", deleteRoutine)
router.post("/clone", cloneRoutine)

// Rutas de días de rutina
router.get("/days/:rutinaId", getRoutineDays)
router.post("/day/create", createRoutineDay)
router.put("/day/update/:id", updateRoutineDay)
router.delete("/day/delete/:id", deleteRoutineDay)
router.delete("/days/deleteAll/:rutinaId", deleteAllRoutineDays)

// Rutas de rutina activa
router.get("/active/:usuariId", getActiveRoutine)
router.post("/active/set", setActiveRoutine)
router.get("/active/calendar/:usuariId", getActiveRoutineCalendar)
router.delete("/active/remove/:usuariId", removeActiveRoutine)

export default router
