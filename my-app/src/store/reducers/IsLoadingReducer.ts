export interface IsLoadingState {
    isLoading: boolean;
}
export enum IsLoadingActionTypes {
    SET_LOADING = "SET_LOADING"
}
interface SetLoadingAction {
    type: IsLoadingActionTypes.SET_LOADING;
    payload: boolean
}
export type IsLoadingTypes = SetLoadingAction;

const initState: IsLoadingState = {
    isLoading: false
}

export const IsLoadingReducer = (
    state: IsLoadingState = initState,
    action: IsLoadingTypes
) : IsLoadingState => {
    switch(action.type) {
        case IsLoadingActionTypes.SET_LOADING:
            return {...state, isLoading: action.payload};
    }
    return state;
}
