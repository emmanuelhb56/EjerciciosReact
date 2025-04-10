import { useState } from "react"
import { categories } from "../data/categories"

export default function Form() {
  const [activity, setActivity] = useState({
    categories: 1,
    name: '',
    calories: 0
  })

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.id]: e.target.value
    })
  }

  return (
    <form className='space-y-5 bg-white shadow p-10 rounded-lg'>
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor="categories" className="font-bold">Categoría:</label>
            <select 
              id="categories" 
              className='border border-slate-300 p-2 rounded-lg w-full bg-white'
              value={activity.categories}
              onChange={handleChange}
              
            >
              {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
        </div>
        <div className='grid grid-cols-1 gap-3'>  
          <label htmlFor="name" className="font-bold">Actividad:</label>
          <input 
            type="text" 
            id="name" 
            placeholder='Ej: Comida, Jugo de Naranja, Ensalada, etc.' 
            className='border border-slate-300 p-2 rounded-lg w-full bg-white'
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className='grid grid-cols-1 gap-3'>  
          <label htmlFor="calories" className="font-bold">Calorias:</label>
          <input 
            type="number" 
            id="calories" 
            placeholder='Ej: 100, 200, 300, etc.' 
            className='border border-slate-300 p-2 rounded-lg w-full bg-white'
            value={activity.calories}
            onChange={handleChange}
          />
        </div>
        <input 
          type="submit" 
          value="Guardar Comida o Guardar Ejercicio" 
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white font-bold cursor-pointer"
        />
    </form>
  )
}

