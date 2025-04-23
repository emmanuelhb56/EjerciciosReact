export type BudgetActions =
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'reset-budget'}

export type BudgetState = {
    budget: number
}

export const initialState: BudgetState = {
    budget: 0
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    switch (action.type) {
        case 'add-budget':
            return {...state, budget: action.payload.budget}
        case 'reset-budget':
            return {...state, budget: 0}
        default:
            return state
    }
}