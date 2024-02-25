export const setTokenInStorage = ({token}:{token:string})=>{
  localStorage.setItem("app-auth.token", token)
}

export const getTokenFromStorage = () => {
    return localStorage.getItem("app-auth.token");
};