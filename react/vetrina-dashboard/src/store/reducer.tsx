import { FETCH_ERROR, FETCH_REQUEST, FETCH_RESPONSE } from "../actions/actionTypes";
import { ActionType, StateType } from "../components/models/DataStructure";
import initialState from "./store";


// reducer
const reducer = (state = initialState, { type, payload }: ActionType): StateType => {
  switch (type) {
    case FETCH_REQUEST:
      return {
        ...state,
        data: [],
        isLoading: true,
      };
    case FETCH_RESPONSE:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case FETCH_ERROR:
      return {
        ...state,
        data: [],
        error: payload,
      };
    default:
      return state;
  }
};


export default reducer;
