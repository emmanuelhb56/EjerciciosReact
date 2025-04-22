import { Dispatch } from "react"
import { OrderAction } from "../reducers/order-reducers"
import type { MenuItem } from "../types"
type MenuItemProps = {
    item: MenuItem
    dispatch: Dispatch<OrderAction>
}
export default function MenuItem({ item, dispatch }: MenuItemProps) {
  return (
    <>
      <button
        className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
        type="button"
        onClick={() => dispatch({ type: 'addItem', payload: { item } })}
      >
        <p className="text-lg">{item.name}</p>
        <p className="text-lg font-black">${item.price}</p>
      </button>
    </>
  )
}
