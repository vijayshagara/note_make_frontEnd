import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pageComponents/Home/HomePage';
import AddEdit from './components/pageComponents/Add/AddEdit';
import Login from './components/pageComponents/Login/Login';
import { useEffect, useReducer, 
  // useContext
} from 'react';
import { setTokenInStorage, getTokenFromStorage } from './service/storage';
import StateContext from './components/contexts/StateContext';
import DispatchContext from './components/contexts/DispatchContext';
import { getUserInfo } from './service/api/Notes';
import { setAuthHearders } from './service/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface InitialValue {
  isLoggedIn: boolean;
  token: string | null;
  user: any ;
}

function App() {
  const navigate = useNavigate()
  // const appState = useContext(StateContext)
  // const appDispatch = useContext(DispatchContext)

  const initialValue: InitialValue = {
    isLoggedIn: Boolean(getTokenFromStorage()),
    token: getTokenFromStorage(),
    user: null,
  };

  
  const appReducer = (state: InitialValue, action: { type: string; value?: any }) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          isLoggedIn: true,
          token: action.value,
        };
      case 'logout':
        return {
          ...state,
          isLoggedIn: false,
          token: '',
          user: null,
        };
      case 'set_user':
        return {
          ...state,
          user: action.value,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialValue);
  useEffect(()=>{
    if(state.token){
      setTokenInStorage({token:state.token})
      setAuthHearders({accessToken:state.token})
    }

  },[state.token])

  useEffect(()=>{
    if(!state.isLoggedIn){
      setTokenInStorage({token:''})
      setAuthHearders({accessToken:''})
    }

  },[state.isLoggedIn])
  useEffect(()=>{
    const getUseDetials = async()=>{

      const response:any = await getUserInfo()
      dispatch({type:'set_user',value:response})
    }
    if(state.isLoggedIn && state.token){      
      getUseDetials()
    }
  },[state.isLoggedIn, state.token])
  // logout when JWT token expiry
  const checkTokenExpiration = (token: string | null) => {
    if (!token) {
      console.error('Token is undefined');
      return false;
      }
      
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    };
    
    let token = initialValue.token;
    
    useEffect(() => {
    checkTokenExpiration(token);
  }, [initialValue.token]);
  

  return (
    <>
      <div>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/add-notes' element={<AddEdit />} />
              <Route path='/add-notes/:id' element={<AddEdit />} />
              <Route path='/home' element={<HomePage />} />
            </Routes>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </div>
    </>
  );
}

export default App;
