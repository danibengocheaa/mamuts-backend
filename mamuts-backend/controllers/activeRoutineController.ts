import type { Request, Response } from "express"
import ActiveRoutine from "../models/activeRoutine"
import Rutina from "../models/rutines"
import RutinaDay from "../models/rutinaDay"
import Exercici from "../models/exercici"
import type { IActiveRoutine, IRutinaDay } from "../models/interfaces"
import sequelize from "../database/connection" // Asegúrate de importar tu instancia de sequelize

// Obtener la rutina activa de un usuario
export const getActiveRoutine = async (req: Request, res: Response): Promise<any> => {
  const { usuariId } = req.params

  try {
    console.log(`Fetching active routine for user ${usuariId}`)

    const activeRoutine = (await ActiveRoutine.findOne({
      where: { usuari_id: usuariId },
      include: [
        {
          model: Rutina,
          attributes: ["rutina_id", "nom", "descripcio", "image_url", "difficulty", "duration_weeks"],
        },
      ],
    })) as IActiveRoutine | null

    if (!activeRoutine) {
      console.log(`No active routine found for user ${usuariId}`)
      return res.status(404).json({
        msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
      })
    }

    console.log(`Active routine found for user ${usuariId}:`, activeRoutine.rutina_id)
    res.json(activeRoutine)
  } catch (error) {
    console.error("Error fetching active routine:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Establecer una rutina como activa para un usuario
export const setActiveRoutine = async (req: Request, res: Response): Promise<any> => {
  const { usuariId, rutinaId } = req.body

  // Iniciar una transacción
  const transaction = await sequelize.transaction()

  try {
    // Verificar que la rutina existe
    const routine = await Rutina.findByPk(rutinaId, { transaction })
    if (!routine) {
      await transaction.rollback()
      return res.status(404).json({
        msg: `No existe una rutina con el id ${rutinaId}`,
      })
    }

    // Verificar si el usuario ya tiene una rutina activa
    const existingActive = (await ActiveRoutine.findOne({
      where: { usuari_id: usuariId },
      transaction,
    })) as IActiveRoutine | null

    let result
    if (existingActive) {
      // Actualizar la rutina activa existente
      result = await existingActive.update(
        {
          rutina_id: rutinaId,
          start_date: new Date(),
        },
        { transaction },
      )
    } else {
      // Crear una nueva rutina activa
      result = await ActiveRoutine.create(
        {
          usuari_id: usuariId,
          rutina_id: rutinaId,
          start_date: new Date(),
        },
        { transaction },
      )
    }

    // Confirmar la transacción
    await transaction.commit()

    res.json(result)
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback()

    console.error("Error setting active routine:", error)
    res.status(500).json({
      msg: "Error al establecer la rutina activa",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Obtener el calendario de ejercicios de la rutina activa
export const getActiveRoutineCalendar = async (req: Request, res: Response): Promise<any> => {
  const { usuariId } = req.params

  try {
    console.log(`Fetching active routine calendar for user ${usuariId}`)

    // Obtener la rutina activa del usuario
    const activeRoutine = (await ActiveRoutine.findOne({
      where: { usuari_id: usuariId },
      include: [
        {
          model: Rutina,
          attributes: ["rutina_id", "nom", "descripcio"],
        },
      ],
    })) as IActiveRoutine | null

    if (!activeRoutine) {
      console.log(`No active routine found for user ${usuariId}`)
      return res.status(404).json({
        msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
      })
    }

    console.log(`Active routine found for user ${usuariId}, routine ID: ${activeRoutine.rutina_id}`)

    // Obtener los días de la rutina activa
    const routineDays = (await RutinaDay.findAll({
      where: { rutina_id: activeRoutine.rutina_id },
      include: [
        {
          model: Exercici,
          attributes: ["exercici_id", "nom", "descripcio", "grupMuscular", "dificultat"],
        },
      ],
      order: [
        ["day_name", "ASC"],
        ["rutina_day_id", "ASC"],
      ],
    })) as IRutinaDay[]

    console.log(`Found ${routineDays.length} routine days for routine ${activeRoutine.rutina_id}`)

    // Add virtual fields for compatibility with frontend
    const routineDaysWithVirtual = routineDays.map((day) => {
      const plainDay = day.get({ plain: true })
      if (plainDay.Exercici) {
        plainDay.Exercici.image_url = null
        plainDay.Exercici.categoria = plainDay.Exercici.grupMuscular
      }
      return plainDay
    })

    // Agrupar los ejercicios por día
    const calendar: Record<string, any[]> = {}

    routineDaysWithVirtual.forEach((day) => {
      if (!calendar[day.day_name]) {
        calendar[day.day_name] = []
      }
      calendar[day.day_name].push(day)
    })

    res.json({
      activeRoutine,
      calendar,
    })
  } catch (error) {
    console.error("Error fetching active routine calendar:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Eliminar la rutina activa de un usuario
export const removeActiveRoutine = async (req: Request, res: Response): Promise<any> => {
  const { usuariId } = req.params

  try {
    const activeRoutine = (await ActiveRoutine.findOne({
      where: { usuari_id: usuariId },
    })) as IActiveRoutine | null

    if (!activeRoutine) {
      return res.status(404).json({
        msg: `El usuario con id ${usuariId} no tiene una rutina activa`,
      })
    }

    await activeRoutine.destroy()

    res.json({
      msg: `Rutina activa eliminada correctamente para el usuario con id ${usuariId}`,
    })
  } catch (error) {
    console.error("Error removing active routine:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
