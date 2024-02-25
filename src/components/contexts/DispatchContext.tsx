import { createContext, Dispatch } from 'react';

// Define the type for your action
interface ActionType {
  type: string;
  value: string;
}

// Define the context type
interface MyContextType {
  dispatch: Dispatch<ActionType>;
}

// Create your context
const DispatchContext :any = createContext<MyContextType | null>(null);

export default DispatchContext;
