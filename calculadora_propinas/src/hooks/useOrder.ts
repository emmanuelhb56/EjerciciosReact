import { useState } from "react"
import { MenuItem, OrderItem } from "../types"

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    function addItem(item: MenuItem) {
        const itemExist = order.find((orderItem) => orderItem.id === item.id)
        
        if (itemExist) {
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? 
                {... orderItem, quantity: orderItem.quantity + 1}
                : orderItem)
            setOrder(updatedOrder)
        } else{
            const newItem: OrderItem = {...item,quantity: 1}
            setOrder([...order,  newItem])
        }
       
    }

    function removeItem(id: MenuItem['id']) {
        const updatedOrder = order.filter(item => item.id !== id)
        setOrder(updatedOrder)
    }

    function placeOrder() {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}