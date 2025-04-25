import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"


export type BudgetActions =
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'hide-modal'} |
    {type: 'reset-budget'}|
    {type: 'add-expense', payload: {expense: DraftExpense}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}

const createExpense = (draftExpense: DraftExpense) : Expense =>{
    return {...draftExpense, id: uuidv4()}
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions): BudgetState => {
    switch (action.type) {
        case 'add-budget':
            return {...state, budget: action.payload.budget, modal: false}
        case 'show-modal':
            return {...state, modal: true}
        case 'hide-modal':
            return {...state, modal: false}
        case 'reset-budget':
            return {...state, budget: 0}
        case 'add-expense': {
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: state.expenses.concat(expense),
                modal: false
            };
        }
        default:
            return state
    }
}
