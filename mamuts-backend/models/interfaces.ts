import type { Model } from "sequelize"

// Interfaz para el modelo de Rutina
export interface IRutina extends Model {
  rutina_id: number
  usuari_id: number
  nom: string
  descripcio?: string
  is_predefined?: boolean
  image_url?: string
  difficulty?: string
  duration_weeks?: number
}

// Interfaz para el modelo de RutinaDay
export interface IRutinaDay extends Model {
  rutina_day_id: number
  rutina_id: number
  day_name: string
  exercici_id: number
  sets: number
  reps: string
  notes?: string
  Exercici?: IExercici
}

// Interfaz para el modelo de Exercici
export interface IExercici extends Model {
  exercici_id: number
  rutina_id: number
  nom: string
  descripcio?: string
  grupMuscular?: string
  dificultat?: string
  image?: Buffer

  // Virtual fields for compatibility
  imageUrl?: string
  image_url?: string
  categoria?: string
}

// Interfaz para el modelo de ActiveRoutine
export interface IActiveRoutine extends Model {
  active_id: number
  usuari_id: number
  rutina_id: number
  start_date: Date
  Rutina?: IRutina
}
