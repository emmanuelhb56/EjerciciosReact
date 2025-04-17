import { Activity } from "../types"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Apple, BicepsFlexed, Pencil, Trash2 } from 'lucide-react';
import { Dispatch, useMemo } from "react";
import { categories } from "../data/categories";
import { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  const categoryName = useMemo(() => 
    (category: Activity['categories']) => categories.map(cat => cat.id === category ? cat.name: '')
  ,[]) 

  const isEmptyActivity = useMemo(() => activities.length === 0, [activities])
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Comida y Actividades</h2>
      <div className="space-y-6">

        {
        isEmptyActivity ? (
          <p className="text-2xl text-center italic">No hay actividades aún ....</p>
        ):
        activities.map((activity) => (
          <Card key={activity.id} className="p-6 flex justify-between items-center shadow-md">
            <CardContent className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="space-y-2 relative">
                <Badge variant="default" 
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                    categoryName(activity.categories).includes('Comida') ? 'bg-red-600' : 'bg-lime-600'
                  }`}>
                  {categoryName(activity.categories).includes('Comida') ? (
                    <div className="flex items-center gap-2">
                      <Apple className="h-6 w-6" />
                      <span className="text-lg">Comida</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BicepsFlexed className="h-6 w-6" />
                      <span className="text-lg">Ejercicio</span>
                    </div>
                  )}
                </Badge>
                <h3 className="text-2xl font-semibold pt-5">{activity.name}</h3>
                <p className="font-extrabold text-3xl text-lime-600">
                  {activity.calories} <span className="text-lg">Calorías</span>
                </p>
              </div>   
              
              <div className="flex items-center gap-5">
                <Button onClick={() => {
                  dispatch({
                    type: 'set-activeId',
                    payload: { id: activity.id }
                  })
                }}>
                  <Pencil className="h-6 w-6" />
                </Button>
                <Button variant="destructive" onClick={() => {
                  dispatch({
                    type: 'delete-activity',
                    payload: { id: activity.id }
                  })
                }}>
                  <Trash2 className="h-6 w-6" />
                </Button>
              </div>    
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

