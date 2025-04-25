import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

  const [budget, setBudget] = useState(0)
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid =  useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({
      type: 'add-budget',
      payload: {budget}
    })
  }

  return (
    <>
      <form className='space-y-5' onSubmit={handleSubmit}>

        <div className='flex flex-col space-y-5'>
            <label htmlFor="budget" className='text-4xl text-blue-600 font-bold text-center'>
                Presupuesto
            </label>
            <input 
                type="number" name="budget" id="budget" 
                className='w-full bg-white border bordger border-gray-200 p-2 rounded-lg'
                placeholder='Define tu presupuesto'
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input 
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full uppercase disabled:bg-gray-300 disabled:cursor-not-allowed'
            type="submit" 
            value="Definir presupuesto"
            disabled={isValid}
        />

      </form>
    </>
  )
}
