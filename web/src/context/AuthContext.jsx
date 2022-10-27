import { createContext,useState } from "react";

export const UserContext = createContext();

export const AuthProvider = ({children}) =>{

    const [ userInfo, setUserInfo] = useState([])



    const login = async (user) =>{
        setUserInfo(user)
    }

    const logout = () => {
        setUserInfo(null);
    }

    

    return (
        <UserContext.Provider
            value={{
                login,
                userInfo,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )
    
}