import { MenuItem, OrderItem } from "../types";

export type OrderAction = 
    {type: 'addItem', payload: {item: MenuItem}} |
    {type: 'removeItem', payload: {id: MenuItem['id']}}|
    {type: 'placeOrder'}|
    {type: 'addTip', payload: {value: number}}

export type OrderState = {order: OrderItem[], tip: number}

export const initialState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = initialState, action: OrderAction): OrderState => {
    switch (action.type) {
        case 'addItem': {
            const itemExist = state.order.find((orderItem) => orderItem.id === action.payload.item.id);
            const updatedOrder: OrderItem[] = itemExist
                ? state.order.map(orderItem => orderItem.id === action.payload.item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem)
                : [...state.order, { ...action.payload.item, quantity: 1 }];
            return { ...state, order: updatedOrder };
        }
        case 'removeItem':
            return { ...state, order: state.order.filter(item => item.id !== action.payload.id) };
        case 'placeOrder':
            return { ...state, order: [], tip: 0 };
        case 'addTip':
            return { ...state, tip: action.payload.value };
        default:
            return state;
    }
}

