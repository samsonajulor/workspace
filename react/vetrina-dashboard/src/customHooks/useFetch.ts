import { useEffect, useReducer } from "react";
import { FETCH_REQUEST, FETCH_RESPONSE, FETCH_ERROR } from "../actions/actionTypes";
import axios from 'axios';
import reducer from "../store/reducer";
import initialState from "../store/store";


// custom fetch hook
export const useFetch = (url: string): any => {
  const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
     (async () => {
         dispatch({ type: FETCH_REQUEST });
         try {
             const response = await axios.get(url);
             const data = response.data;
                dispatch({ type: FETCH_RESPONSE, payload: data.articles });
            //  console.log(data.articles);
         } catch (error) {
                dispatch({ type: FETCH_ERROR, payload: error });
          }
     })();
  }, [url]);


  return { state };
}
                    