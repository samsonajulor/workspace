import { createContext } from "react";
import initialState, {NewsContextType} from "../store/store";

const NewsContext = createContext<NewsContextType>(initialState);

const NewsContextProvider = NewsContext.Provider;

export { NewsContextProvider, NewsContext };