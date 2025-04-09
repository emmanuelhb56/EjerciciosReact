import { Dispatch, SetStateAction } from "react"

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
]

type TipPercentageFormProps = {
    tip : number,
    setTip : Dispatch<SetStateAction<number>>
}  

export default function TipPercentageForm({ setTip, tip }: TipPercentageFormProps) {

    return (
        <>
            <div>
                <h3 className="font-black text-2xl"> Propina:</h3>

                <form>
                    {tipOptions.map((option) => (
                        <div className="flex gap-2 items-center" key={option.id}>
                           <label htmlFor={option.id} className="mr-2">{option.label}</label>
                           <input 
                                type="radio" 
                                name="tip" 
                                id={option.id} 
                                value={option.value} 
                                onChange={(e) => setTip(Number(e.target.value))}
                                checked={option.value === tip}
                            />
                        </div>
                    ))}
                </form>
            </div>
        </>
    )
}