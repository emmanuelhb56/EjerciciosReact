import { useContext } from "react";
import BudgetForm from "./components/BudgetForm";
import { BudgetContext } from "./context/BudgetContext";


export default function App() {

  const context = useContext(BudgetContext)

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-center text-4xl font-extrabold text-white uppercase">
          Control de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  )
}


