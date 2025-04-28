import { categories } from "../data/categories";
import DataPicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { ChangeEvent, useState } from "react";
import { DraftExpense } from "../types";
import { Value } from "react-calendar/src/shared/types.js";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
    // Validación de Formulario
    if(Object.values(expense).includes('')) {
        setError('Todos los campos son obligatorios')
        return
    }

    dispatch({
      type: 'add-expense',
      payload: {
        expense
    }})

    // Resetear Form
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })

    setError('')
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
        <legend
            className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'
        >Nuevo Gasto</legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl"> Nombre Gasto: </label>
            <input 
                type="text" 
                id="expenseName" 
                placeholder="Añade el Nombre del Gasto o Servicio"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl"> Cantidad: </label>
            <input 
                type="number" 
                id="amount" 
                placeholder="Añade la cantidad del Gasto o Servicio en Pesos. Ej: 3000"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl"> Categoria: </label>
            <select 
                id="category" 
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}> {category.name} </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-xl"> Fecha Gasto: </label>
            <DataPicker
                className="bg-slate-100 p-2 border-0"
                name="date"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <input 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg uppercase w-full"
            value= {'Registrar Gasto'}
        />
    </form>
  )
}
