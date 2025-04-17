import { JSX } from "react"

type CalorieDisplayProps = {
    calories: number
    text: string
    icon : JSX.Element
}
export default function CalorieDisplay( {calories, text, icon}: CalorieDisplayProps ) {
  return (  
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center items-center">
        {icon}
        <span className="font-black text-7xl text-orange-600">  {calories}  </span>  
        <span className="text-2xl">{text}</span>
    </p>
    
  )
}
