import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import './ForgotPassword.css';
import {config} from '../../config/config';


const ForgotPassword = () => {

  const navigate = useNavigate();
  const { search } = useLocation();

  const [password, setPassword] = useState("")

const userValid = async () =>{
  await axios.get(`${config.apiURL}/user/reset/${token}`)
    .then( (res) =>{
      if(res === 201){
        console.log('user valido',res);
        Swal.fire({
          showConfirmButton: true,
          icon:'success',
          text:'se actualizó correctamente su contraseña, ahora puede iniciar sesion'
      })
      }else{
        console.log('user invalido');
        Swal.fire({
          showConfirmButton: true,
          icon:'error',
          text:'ah ocurrido un error,no se actualizó correctamente su contraseña, revise los datos'
      })
        navigate('/')
      }
    }).catch((err =>{
      console.log(err);
    }))
}

   const selVel =(e) => {
       setPassword(e.target.value)
   }


  const [ token , setToken] =  useState();
  const handletoken = async (e) =>{
    e.preventDefault();

    await axios.put(`${config.apiURL}/user/updatepassword/${token}`, {password:password})
    .then( (res) =>{
      if(res){
        setPassword();
        Swal.fire({
          showConfirmButton: true,
          icon:'success',
          text:'se actualizó correctamente su contraseña'
      })
      navigate('/')
    }
    }).catch((err =>{
      Swal.fire({
        showConfirmButton: true,
        icon:'error',
        text:'ah ocurrido un error,no se actualizó correctamente su contraseña, revise los datos'
    })
    }))
  }
   const tokenParams =  useCallback ( async (params)=>{

    const replaceFirstCharacter = await params.replace('?', '');
    await setToken(replaceFirstCharacter)
   },[token])
    useEffect(() => {
     tokenParams(search)
    }, [search])
  return (
    <div className='container'>
        <div className="container-logo">
          <Link to='/'>
              <img src={"./logo.jpg"} width='250' className="img" alt="logo" />
          </Link>
        </div>
          <form className="form">
            <h3 className="contraseña">Actualizar contraseña</h3>
            <p className="text">Ingrese una nueva contraseña para actualizar</p>
              <input 
              className="input"
              type="password"
              value={password}
              onChange={selVel}
              name="password"
              placeholder='password'/>
              <button 
              onClick={(e)=>handletoken(e)}
              className="enviar"
              >enviar</button>
          </form>
    </div>
  )
}

export default ForgotPassword