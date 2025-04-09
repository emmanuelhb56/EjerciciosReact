import { useCallback } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types"
type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}
export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
 
  const subTotalAmount = useCallback(() => 
    order.reduce((total, item) => total + item.price * item.quantity, 0)
  , [order])
  
  const tipAmount = useCallback(() => 
    subTotalAmount() * tip
  , [subTotalAmount, tip])

  const totalAmount = useCallback(() => 
    subTotalAmount() + tipAmount()
  , [subTotalAmount, tipAmount])

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl"> Totales y Propinas:</h2>
            <p className="text-lg">Subtotal: 
                <span className="font-black"> {formatCurrency(subTotalAmount()) }</span>
            </p>

            <p className="text-lg">Propina:
                <span className="font-black"> {formatCurrency(tipAmount()) }</span>
            </p>

            <p className="text-lg">Total a pagar:
                <span className="font-black"> {formatCurrency(totalAmount()) }</span>
            </p>

            <button
              className="w-full bg-black p-3 uppercase text-white rounded-lg font-bold mt-10 disabled:opacity-50"
              disabled={totalAmount() === 0}
              onClick={() => placeOrder()}
              
            >
              Guardar Orden
            </button>
        </div>
      
    </>
  )
}
