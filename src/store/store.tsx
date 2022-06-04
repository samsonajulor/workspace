import { StateType } from "../components/models/DataStructure";


const initialState: StateType = {
  isLoading: false,
  error: null,
  data: [],
};

export type NewsContextType = typeof initialState;

export default initialState