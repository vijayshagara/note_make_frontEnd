import { createContext } from "react";
interface InitialValue {
    isLoggedIn: boolean;
    token: string | null;
    user: any ;
  }
  let initialValue:InitialValue= {
    isLoggedIn:false,
    token: '',
    user: '',
}

const StateContext =  createContext(initialValue)

export default StateContext;