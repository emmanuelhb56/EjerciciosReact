import { formatCurrency } from "../helpers"

type amountDisplayProps = { label: string, amount: number }

export default function AmoundDisplay( { label, amount } : amountDisplayProps ) {
  return (
    <>
        <p className="text-2xl text-blue-600 font-bold ">
            {label}: {' '} 
            <span className="font-black text-black">{formatCurrency(amount)}</span>
        </p>
    </>
  )
}
