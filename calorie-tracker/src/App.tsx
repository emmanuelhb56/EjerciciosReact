import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activityReducer'
import ActivityList from "./components/ActivityList"
import { Button } from "./components/ui/button"
import CalorieTracker from "./components/CalorieTracker"


function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-3xl font-extrabold text-white uppercase">Contador de Calorias</h1>
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200"
            onClick={() => dispatch({ type: 'restart-activities' })}
            disabled={!canRestartApp}
          >
            Reiniciar App
          </Button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            activities={state.activities}
            dispatch={dispatch} 
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto p-10">
          <CalorieTracker
            activities={state.activities} 
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
  )
}

export default App
