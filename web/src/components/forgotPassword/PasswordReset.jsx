import { useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () =>{


    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const userEmail = {
            email: e.target.email.value
        };
        await axios.post('http://localhost:3000/user/sendpasswordlink' , userEmail)
            .then( (res) =>{
                Swal.fire({
                    showConfirmButton: true,
                    icon:'success',
                    text:'revise su email, se le ha enviado un enlace para crear nueva contraseña'
                })
            }).catch((error)=>{
                Swal.fire({
                    showConfirmButton: true,
                    icon:'error',
                    text:'ah ocurrido un error '
                })
            })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                    <h3>recuperar contraseña</h3>
                    <div>correo electorino</div>
                    <input type="email" name="email" placeholder="ingresar email" required />
                    <div>
                        <button>enviar</button>
                    </div>
            </form>
        </div>
    )
}


export default ForgotPassword;
