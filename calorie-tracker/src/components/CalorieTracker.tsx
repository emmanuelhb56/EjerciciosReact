import { useMemo } from "react"
import type { Activity } from "../types"
import { Flame, Ruler, Utensils } from "lucide-react"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}
export default function CalorieTracker({activities}: CalorieTrackerProps) {
    // Contador 
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => 
        activity.categories === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => 
        activity.categories === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])

    const isEmptyActivity = useMemo(() => activities.length === 0, [activities])
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-10 text-white">Resumen de Calorias</h2>
      {isEmptyActivity ? (
        <p className="text-2xl text-center font-light text-white italic">No hay actividades aún...</p>
      ):(
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">     
            <CalorieDisplay
                calories={caloriesConsumed}
                text="Consumidas"
                icon={<Utensils className="h-15 w-15 text-orange-700 mx-auto" />}
            />

            <CalorieDisplay
                calories={caloriesBurned}
                text="Consumidas"
                icon={<Flame className="h-15 w-15 text-orange-700 mx-auto" />}
            />

            <CalorieDisplay
                calories={netCalories}
                text="Diferencia"
                icon={<Ruler className="h-15 w-15 text-orange-700 mx-auto" />}
            />

        </div>
      )}
    </>
  )
}
