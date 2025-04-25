import AmoundDisplay from "./AmoundDisplay";

export default function BudgetTracker() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <img src="/grafico.jpg" alt="Gráfico de Gastos" />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type="button"
                className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-md uppercase"
            >
              Resetear App
            </button>
            
            <AmoundDisplay 
              label="Presupuesto"
              amount={0}
            />
            

        </div>
      </div>
    </>
  )
}
