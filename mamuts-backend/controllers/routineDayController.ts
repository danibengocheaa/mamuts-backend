import type { Request, Response } from "express"
import RutinaDay from "../models/rutinaDay"
import Exercici from "../models/exercici" // Asegúrate de que este modelo exista

// Obtener todos los días de una rutina
export const getRoutineDays = async (req: Request, res: Response): Promise<any> => {
  const { rutinaId } = req.params

  try {
    console.log(`Fetching routine days for routine ID: ${rutinaId}`)

    const routineDays = await RutinaDay.findAll({
      where: { rutina_id: rutinaId },
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
    })

    // Add virtual fields for compatibility with frontend
    const routineDaysWithVirtual = routineDays.map((day) => {
      const plainDay = day.get({ plain: true })
      if (plainDay.Exercici) {
        plainDay.Exercici.image_url = null
        plainDay.Exercici.categoria = plainDay.Exercici.grupMuscular
      }
      return plainDay
    })

    console.log(`Found ${routineDays.length} routine days for routine ${rutinaId}`)
    res.json(routineDaysWithVirtual)
  } catch (error) {
    console.error("Error fetching routine days:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Crear un nuevo día de rutina
export const createRoutineDay = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Creating new routine day with data:", req.body)

    // IMPORTANT: Remove rutina_day_id from the request body to let the database auto-increment it
    const { rutina_day_id, ...dayData } = req.body

    // Create the new routine day without specifying the ID
    const newRoutineDay = await RutinaDay.create(dayData)

    console.log("New routine day created successfully with ID:", newRoutineDay.get("rutina_day_id"))
    res.json(newRoutineDay)
  } catch (error) {
    console.error("Error creating routine day:", error)
    res.status(500).json({
      msg: "Error creating routine day. Please contact the administrator.",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Actualizar un día de rutina
export const updateRoutineDay = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { body } = req

  try {
    console.log(`Updating routine day with ID: ${id}`)

    const routineDay = await RutinaDay.findByPk(id)
    if (!routineDay) {
      console.log(`No routine day found with ID ${id}`)
      return res.status(404).json({
        msg: `No existe un día de rutina con el id ${id}`,
      })
    }

    // Remove rutina_day_id from the update data if present
    const { rutina_day_id, ...updateData } = body

    await routineDay.update(updateData)
    console.log(`Routine day ${id} updated successfully`)
    res.json(routineDay)
  } catch (error) {
    console.error("Error updating routine day:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Eliminar un día de rutina
export const deleteRoutineDay = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    console.log(`Deleting routine day with ID: ${id}`)

    const routineDay = await RutinaDay.findByPk(id)
    if (!routineDay) {
      console.log(`No routine day found with ID ${id}`)
      return res.status(404).json({
        msg: `No existe un día de rutina con el id ${id}`,
      })
    }

    await routineDay.destroy()
    console.log(`Routine day ${id} deleted successfully`)
    res.json({
      msg: `Día de rutina con id ${id} eliminado correctamente`,
    })
  } catch (error) {
    console.error("Error deleting routine day:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Eliminar todos los días de una rutina
export const deleteAllRoutineDays = async (req: Request, res: Response): Promise<any> => {
  const { rutinaId } = req.params

  try {
    console.log(`Deleting all routine days for routine ID: ${rutinaId}`)

    const result = await RutinaDay.destroy({
      where: { rutina_id: rutinaId },
    })

    console.log(`Deleted ${result} routine days for routine ${rutinaId}`)
    res.json({
      msg: `Todos los días de la rutina con id ${rutinaId} eliminados correctamente`,
      count: result,
    })
  } catch (error) {
    console.error("Error deleting routine days:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
