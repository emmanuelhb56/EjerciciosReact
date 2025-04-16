import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activityReducer'
import ActivityList from "./components/ActivityList"
import { Button } from "./components/ui/button"


function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white cursor-pointer rounded-lg text-sm "
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
