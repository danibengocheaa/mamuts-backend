import type { Request, Response } from "express"
import Routine from "../models/rutines"
import RutinaDay from "../models/rutinaDay"
import Exercici from "../models/exercici"
import ActiveRoutine from "../models/activeRoutine" // Importar ActiveRoutine
import { Op } from "sequelize"
import type { IRutina, IRutinaDay } from "../models/interfaces"
import sequelize from "../database/connection" // Asegúrate de importar tu instancia de sequelize

// Obtener todas las rutinas
export const getRoutines = async (req: Request, res: Response): Promise<any> => {
  try {
    const routines = await Routine.findAll({
      order: [["rutina_id", "ASC"]],
    })

    res.json(routines)
  } catch (error) {
    console.error("Error fetching routines:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
    })
  }
}

// Obtener rutinas por usuario
export const getRoutinesByUser = async (req: Request, res: Response): Promise<any> => {
  const { usuariId } = req.params

  try {
    const routines = await Routine.findAll({
      where: { usuari_id: usuariId },
      order: [["rutina_id", "ASC"]],
    })

    res.json(routines)
  } catch (error) {
    console.error("Error fetching user routines:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
    })
  }
}

// Obtener rutinas predefinidas
export const getPredefinedRoutines = async (req: Request, res: Response): Promise<any> => {
  try {
    const routines = await Routine.findAll({
      where: { is_predefined: true },
      order: [["rutina_id", "ASC"]],
    })

    res.json(routines)
  } catch (error) {
    console.error("Error fetching predefined routines:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
    })
  }
}

// Obtener una rutina por ID con sus días y ejercicios
export const getRoutineWithDays = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    console.log(`Fetching routine details for routine ID: ${id}`)

    const routine = await Routine.findByPk(id)

    if (!routine) {
      console.log(`No routine found with ID ${id}`)
      return res.status(404).json({
        msg: `No existe una rutina con el id ${id}`,
      })
    }

    console.log(`Routine found: ${routine.get("nom")}`)

    // Obtener los días de la rutina con sus ejercicios
    const routineDays = (await RutinaDay.findAll({
      where: { rutina_id: id },
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

    console.log(`Found ${routineDays.length} routine days for routine ${id}`)

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
    const days: Record<string, any[]> = {}

    routineDaysWithVirtual.forEach((day) => {
      if (!days[day.day_name]) {
        days[day.day_name] = []
      }
      days[day.day_name].push(day)
    })

    res.json({
      routine,
      days,
    })
  } catch (error) {
    console.error("Error fetching routine with days:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: (error as Error).message,
    })
  }
}

// Crear una nueva rutina
export const createRoutine = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Creating new routine with data:", req.body)

    // IMPORTANT: Remove rutina_id from the request body to let the database auto-increment it
    const { rutina_id, ...routineData } = req.body

    // Create the new routine without specifying the ID
    const newRoutine = await Routine.create(routineData)

    console.log("New routine created successfully with ID:", newRoutine.get("rutina_id"))
    res.json(newRoutine)
  } catch (error) {
    console.error("Error creating routine:", error)
    res.status(500).json({
      msg: "Error creating routine. Please contact the administrator.",
      error: (error as Error).message,
    })
  }
}

// Actualizar una rutina existente
export const updateRoutine = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { body } = req

  try {
    const routine = await Routine.findByPk(id)
    if (!routine) {
      return res.status(404).json({
        msg: `No existe una rutina con el id ${id}`,
      })
    }

    await routine.update(body)
    res.json(routine)
  } catch (error) {
    console.error("Error actualizando rutina:", error)
    res.status(500).json({
      msg: "Habla con el administrador",
    })
  }
}

// Eliminar una rutina
export const deleteRoutine = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  // Validar si el id está presente
  if (!id) {
    return res.status(400).json({
      msg: "ID no proporcionado en la solicitud",
    })
  }

  // Iniciar una transacción para asegurar la integridad de los datos
  const transaction = await sequelize.transaction()

  try {
    // Verificar si la rutina existe antes de intentar eliminarla
    const routine = await Routine.findByPk(id, { transaction })
    if (!routine) {
      await transaction.rollback()
      return res.status(404).json({
        msg: `There is no routine with the id ${id}`,
      })
    }

    // Verificar si la rutina está activa para algún usuario
    const activeRoutines = await ActiveRoutine.findAll({
      where: { rutina_id: id },
      transaction,
    })

    // Si la rutina está activa, primero eliminar esas referencias
    if (activeRoutines.length > 0) {
      console.log(`Routine ${id} is active for ${activeRoutines.length} users. Removing active references first.`)
      await ActiveRoutine.destroy({
        where: { rutina_id: id },
        transaction,
      })
    }

    // Eliminar todos los días de la rutina
    await RutinaDay.destroy({
      where: { rutina_id: id },
      transaction,
    })

    // Eliminar la rutina
    await routine.destroy({ transaction })

    // Confirmar la transacción
    await transaction.commit()

    // Responder con mensaje de éxito
    res.json({
      msg: `Routine with id ${id} deleted successfully`,
    })
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback()

    // Mostrar error en consola para depuración
    console.error("Error deleting routine:", error)

    // Responder con mensaje detallado del error
    res.status(500).json({
      msg: "Error al eliminar la rutina",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Buscar rutinas
export const searchRoutines = async (req: Request, res: Response): Promise<any> => {
  const { query } = req.query

  try {
    const routines = await Routine.findAll({
      where: {
        [Op.or]: [{ nom: { [Op.like]: `%${query}%` } }, { descripcio: { [Op.like]: `%${query}%` } }],
      },
      order: [["rutina_id", "ASC"]],
    })

    res.json(routines)
  } catch (error) {
    console.error("Error searching routines:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
    })
  }
}

// Clonar una rutina predefinida para un usuario
export const cloneRoutine = async (req: Request, res: Response): Promise<any> => {
  const { rutinaId, usuariId } = req.body

  try {
    // Obtener la rutina original
    const originalRoutine = (await Routine.findByPk(rutinaId)) as IRutina | null
    if (!originalRoutine) {
      return res.status(404).json({
        msg: `No existe una rutina con el id ${rutinaId}`,
      })
    }

    // Crear una nueva rutina para el usuario
    const newRoutine = (await Routine.create({
      usuari_id: usuariId,
      nom: `${originalRoutine.nom} (Copia)`,
      descripcio: originalRoutine.descripcio,
      is_predefined: false,
      image_url: originalRoutine.image_url,
      difficulty: originalRoutine.difficulty,
      duration_weeks: originalRoutine.duration_weeks,
    })) as IRutina

    // Obtener los días de la rutina original
    const originalDays = (await RutinaDay.findAll({
      where: { rutina_id: rutinaId },
    })) as IRutinaDay[]

    // Crear los días para la nueva rutina
    const newDays = await Promise.all(
      originalDays.map((day) =>
        RutinaDay.create({
          rutina_id: newRoutine.rutina_id,
          day_name: day.day_name,
          exercici_id: day.exercici_id,
          sets: day.sets,
          reps: day.reps,
          notes: day.notes,
        }),
      ),
    )

    res.json({
      routine: newRoutine,
      days: newDays,
    })
  } catch (error) {
    console.error("Error cloning routine:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
    })
  }
}
