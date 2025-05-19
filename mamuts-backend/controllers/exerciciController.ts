import type { Request, Response } from "express"
import Exercici from "../models/exercici"
import type { IExercici } from "../models/interfaces"

// Get all exercises
export const getExercises = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Fetching all exercises")

    const exercises = await Exercici.findAll({
      order: [["nom", "ASC"]],
    })

    // Add virtual fields for compatibility with frontend
    const exercisesWithVirtual = exercises.map((ex) => {
      const plainEx = ex.get({ plain: true })
      plainEx.image_url = null
      plainEx.categoria = plainEx.grupMuscular
      return plainEx
    })

    console.log(`Found ${exercises.length} exercises`)
    res.json(exercisesWithVirtual)
  } catch (error) {
    console.error("Error fetching exercises:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Get exercise by ID
export const getExerciseById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const exercise = (await Exercici.findByPk(id)) as IExercici | null

    if (!exercise) {
      return res.status(404).json({
        msg: `No exercise found with id ${id}`,
      })
    }

    // Add virtual fields for compatibility with frontend
    const plainExercise = exercise.get({ plain: true })
    plainExercise.image_url = null
    plainExercise.categoria = plainExercise.grupMuscular

    res.json(plainExercise)
  } catch (error) {
    console.error("Error fetching exercise:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Create a new exercise
export const createExercise = async (req: Request, res: Response): Promise<any> => {
  const { body } = req

  try {
    const newExercise = (await Exercici.create(body)) as IExercici

    // Add virtual fields for compatibility with frontend
    const plainExercise = newExercise.get({ plain: true })
    plainExercise.image_url = null
    plainExercise.categoria = plainExercise.grupMuscular

    res.status(201).json(plainExercise)
  } catch (error) {
    console.error("Error creating exercise:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Update an exercise
export const updateExercise = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { body } = req

  try {
    const exercise = (await Exercici.findByPk(id)) as IExercici | null

    if (!exercise) {
      return res.status(404).json({
        msg: `No exercise found with id ${id}`,
      })
    }

    await exercise.update(body)

    // Add virtual fields for compatibility with frontend
    const plainExercise = exercise.get({ plain: true })
    plainExercise.image_url = null
    plainExercise.categoria = plainExercise.grupMuscular

    res.json(plainExercise)
  } catch (error) {
    console.error("Error updating exercise:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Delete an exercise
export const deleteExercise = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const exercise = (await Exercici.findByPk(id)) as IExercici | null

    if (!exercise) {
      return res.status(404).json({
        msg: `No exercise found with id ${id}`,
      })
    }

    await exercise.destroy()
    res.json({
      msg: `Exercise with id ${id} deleted successfully`,
    })
  } catch (error) {
    console.error("Error deleting exercise:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Add this new endpoint to match what the client is calling
export const getExercici = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Fetching all exercises via getExercici endpoint")

    // Reuse the existing getExercises function
    return getExercises(req, res)
  } catch (error) {
    console.error("Error in getExercici:", error)
    res.status(500).json({
      msg: "Talk to the administrator",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
