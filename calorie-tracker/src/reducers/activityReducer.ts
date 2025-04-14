import { Activity } from "../types";
export type ActivityActions =
  {type: 'save_activity', payload: { newActivity: Activity }} 


type ActivityState = {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type) {
        case 'save_activity':
            return {
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            }
        default:
            return state
    }
    
}