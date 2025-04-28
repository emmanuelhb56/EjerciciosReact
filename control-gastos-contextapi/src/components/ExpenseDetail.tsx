import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmoundDisplay from "./AmoundDisplay"

type ExpenseDetailProps = {
    expense: Expense
}
export default function ExpenseDetail({expense}: ExpenseDetailProps) {
  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
        
        <div>
            <p className="text-gray-600 text-sm">{expense.category}</p>
        </div>

        <div>
            <p>{expense.expenseName}</p>
            <p className="text-blue-600 text-sm">{formatDate( expense.date!.toString() )}</p>
        </div>

        <AmoundDisplay amount={expense.amount} />
    </div>
  )
}
