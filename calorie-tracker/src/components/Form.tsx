import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activityReducer"

import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select"

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  activities: Activity[]
}

const initialState = {
  id: uuidv4(),
  categories: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const handleSelectChange = (value: string) => {
    setActivity({
      ...activity,
      categories: +value
    })
  }

  const isValiActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'save_activity',
      payload: { newActivity: activity }
    })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form className="space-y-6 bg-white rounded-lg shadow-lg p-10" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="categories" className="flex items-center gap-2">
          <span>Categoría:</span>
        </Label>
        <Select onValueChange={handleSelectChange} value={String(activity.categories)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map(category => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <span>Actividad:</span>
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Ej: Comida, Jugo de Naranja, Ensalada, etc."
          value={activity.name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="calories" className="flex items-center gap-2">
          <span>Calorías:</span>
        </Label>
        <Input
          type="number"
          id="calories"
          placeholder="Ej: 100, 200, etc."
          value={activity.calories}
          onChange={handleChange}
          min={activity.categories === 1 ? 0 : 1}
          max={activity.categories === 1 ? 1000 : 500}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <Button type="submit" className="w-full bg-lime-600 hover:bg-lime-500 text-white py-2 rounded-lg disabled:bg-gray-400" disabled={!isValiActivity()}>
        {activity.categories === 1 ? 'Agregar Comida' : 'Agregar Ejercicio'}
      </Button>
    </form>
  )
}

