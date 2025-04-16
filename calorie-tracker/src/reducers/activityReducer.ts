import { Activity } from "../types";
export type ActivityActions =
  {type: 'save_activity', payload: { newActivity: Activity }}  |
  {type: 'set-activeId', payload: { id: Activity['id'] }} |
  {type: 'delete-activity', payload: { id: Activity['id'] }} |
  {type: 'restart-activities'}


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
) => {
    switch (action.type) {
        case 'save_activity':
            { let updateActivies :Activity[] = []
            if( state.activeId ) {
                updateActivies = state.activities.map(activity => {
                    if (activity.id === state.activeId) {
                        return action.payload.newActivity
                    }
                    return activity
                })
            } else {
                updateActivies = [...state.activities, action.payload.newActivity]
            }
            return {
                ...state,
                activities: updateActivies,
                activeId: ''
            } }
        case 'set-activeId':
            return {
                ...state,
                activeId: action.payload.id
            }
        case 'delete-activity':
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            }
        case 'restart-activities':
            return {
                activities: [],
                activeId: ''
            }
        default:
            return state
    }
    
}