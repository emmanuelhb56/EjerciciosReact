import { useMemo } from 'react'
import BudgetForm from './components/BudgetForm'
import { useBudget } from './hooks/useBudget'
import BudgetTracker from './components/BudgetTracker'
import ExpenseModal from './components/ExpenseModal'
export default function App() {
  
  const {state} = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-center text-4xl font-extrabold text-white uppercase">
          Control de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg mt-10 p-10">
        {isValidBudget ? (
          <BudgetTracker />
        ) : (
          <BudgetForm />
        )}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          
          <ExpenseModal/>
          
        </main>
      )}
    </>
  )
}


