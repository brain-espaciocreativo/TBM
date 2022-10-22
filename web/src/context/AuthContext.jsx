import { createContext,useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const UserContext = createContext();

export const AuthProvider = ({children}) =>{

    const [ userInfo, setUserInfo] = useState([])


    const login = async (email, password) =>{
       
        await axios.post('http://localhost:3000/auth/login',{
            email,
            password
        }).then( res =>{
            setUserInfo(res.data.data[0])
        }).catch( err =>{
            console.log(err.response.status);
            if(err.response.status === 401){
                Swal.fire({
                    text: "Datos incorrectos!",
                    icon: 'error'
                  })
            }
        })
    }

    return (
        <UserContext.Provider
            value={{
                login,
                userInfo
            }}
        >
            {children}
        </UserContext.Provider>
    )
    
}