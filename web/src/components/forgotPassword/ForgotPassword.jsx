import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useCallback } from 'react';


const ForgotPassword = () => {

  const navigate = useNavigate();
  const { search } = useLocation();

  const [password, setPassword] = useState("")

const userValid = async () =>{
  await axios.get(`http://localhost:3000/user/reset/${token}`)
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

    await axios.put(`http://localhost:3000/user/updatepassword/${token}`, {password:password})
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
    <div>
      <section>
        <div>
          <div>
            <h1>ingrese su nueva contraseña</h1>
          </div>
          <form>
              <label htmlFor="password">nueva contraseña</label>
              <input 
              type="password"
              value={password}
              onChange={selVel}
              name="password"
              placeholder='password'/>
              <button 
              onClick={(e)=>handletoken(e)}
              >enviar</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword